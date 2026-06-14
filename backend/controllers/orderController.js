import prisma from "../config/prisma.js";
import Stripe from 'stripe'
import razorpay from 'razorpay'
import { sendOrderConfirmationEmail } from "../config/email.js";


const currency = 'inr'
const deliveryCharge = 10


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const razorpayInstance = new razorpay({
    key_id : process.env.RAZORPAY_KEY_ID,
    key_secret : process.env.RAZORPAY_KEY_SECRET,
})


// Helper: Validate stock for all order items
const validateAndDecrementStock = async (items) => {
    for (const item of items) {
        const productId = item._id || item.id;
        if (!productId) continue;

        const product = await prisma.product.findUnique({ where: { id: String(productId) } });
        if (!product) {
            throw new Error(`Product "${item.name}" is no longer available`);
        }
        if (product.stock < item.quantity) {
            if (product.stock === 0) {
                throw new Error(`"${item.name}" is out of stock`);
            }
            throw new Error(`Only ${product.stock} units of "${item.name}" are available`);
        }
    }

    // All checks passed — now decrement stock
    for (const item of items) {
        const productId = item._id || item.id;
        if (!productId) continue;
        await prisma.product.update({
            where: { id: String(productId) },
            data: { stock: { decrement: item.quantity } }
        });
    }
}

// Helper: Apply and validate coupon
const applyCoupon = async (couponCode, amount) => {
    if (!couponCode) return { discount: 0, finalAmount: amount };

    const coupon = await prisma.coupon.findUnique({ where: { code: couponCode.toUpperCase() } });

    if (!coupon || !coupon.isActive) {
        throw new Error("Invalid or inactive coupon code");
    }

    if (coupon.expiresAt && new Date() > coupon.expiresAt) {
        throw new Error("This coupon has expired");
    }

    if (coupon.currentUses >= coupon.maxUses) {
        throw new Error("This coupon has reached its usage limit");
    }

    if (amount < coupon.minOrderAmount) {
        throw new Error(`Minimum order amount for this coupon is ₹${coupon.minOrderAmount}`);
    }

    const discount = Math.round((amount * coupon.discountPercent) / 100);
    const finalAmount = amount - discount;

    // Increment usage
    await prisma.coupon.update({
        where: { id: coupon.id },
        data: { currentUses: { increment: 1 } }
    });

    return { discount, finalAmount };
}

// Helper: Get user email for order confirmation
const getUserEmail = async (userId) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: String(userId) },
            select: { email: true, name: true }
        });
        return user;
    } catch (error) {
        console.log("Error fetching user email:", error.message);
        return null;
    }
}


const placeOrder = async (req,res) => {
    
    try {
        
        const { userId, items, amount, address, couponCode } = req.body;

        // Validate stock
        await validateAndDecrementStock(items);

        // Apply coupon if provided
        const { discount, finalAmount } = await applyCoupon(couponCode, amount);

        const orderData = {
            userId: String(userId),
            items,
            address,
            amount: finalAmount,
            paymentMethod:"COD",
            payment:false,
            date: String(Date.now()),
            couponCode: couponCode ? couponCode.toUpperCase() : null,
            discount: discount || null
        }

        const newOrder = await prisma.order.create({ data: orderData })

        await prisma.user.update({ where: { id: String(userId) }, data: { cartData: {} } })

        // Send order confirmation email
        const user = await getUserEmail(userId);
        if (user) {
            sendOrderConfirmationEmail(user.email, {
                orderId: newOrder.id,
                items,
                amount: finalAmount,
                discount,
                address,
                paymentMethod: "COD",
                userName: user.name
            });
        }

        res.json({success:true,message:"Order placed successfully", orderId: newOrder.id})


    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}


const placeOrderStripe = async (req,res) => {
    try {
        
        const { userId, items, amount, address, couponCode } = req.body
        const { origin } = req.headers;
        
       
        const allowedOrigins = [
            process.env.FRONTEND_URL || 'http://localhost:5173',
            'http://localhost:3000',
            'https://yourdomain.com'
        ];
        
        const validOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0];

        // Validate stock
        await validateAndDecrementStock(items);

        // Apply coupon if provided
        const { discount, finalAmount } = await applyCoupon(couponCode, amount);

        const orderData = {
            userId: String(userId),
            items,
            address,
            amount: finalAmount,
            paymentMethod:"Stripe",
            payment:false,
            date: String(Date.now()),
            couponCode: couponCode ? couponCode.toUpperCase() : null,
            discount: discount || null
        }

        const newOrder = await prisma.order.create({ data: orderData })

        const line_items = items.map((item) => ({
            price_data: {
                currency:currency,
                product_data: {
                    name:item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        // Add discount as a negative line item if applicable
        if (discount > 0) {
            line_items.push({
                price_data: {
                    currency: currency,
                    product_data: {
                        name: `Discount (${couponCode.toUpperCase()})`
                    },
                    unit_amount: discount * 100
                },
                quantity: -1
            });
        }

        line_items.push({
            price_data: {
                currency:currency,
                product_data: {
                    name:'Delivery Charges'
                },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${validOrigin}/verify?success=true&orderId=${newOrder.id}`,
            cancel_url:  `${validOrigin}/verify?success=false&orderId=${newOrder.id}`,
            line_items,
            mode: 'payment',
        })

        res.json({success:true,session_url:session.url});

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


const verifyStripe = async (req,res) => {

    const { orderId, success, userId } = req.body

    try {
        if (success === "true") {
            await prisma.order.update({ where: { id: String(orderId) }, data: { payment: true } });
            await prisma.user.update({ where: { id: String(userId) }, data: { cartData: {} } })

            // Send order confirmation email
            const order = await prisma.order.findUnique({ where: { id: String(orderId) } });
            const user = await getUserEmail(userId);
            if (user && order) {
                sendOrderConfirmationEmail(user.email, {
                    orderId: order.id,
                    items: order.items,
                    amount: order.amount,
                    discount: order.discount,
                    address: order.address,
                    paymentMethod: "Stripe",
                    userName: user.name
                });
            }

            res.json({success: true});
        } else {
            // Restore stock on failed payment
            const order = await prisma.order.findUnique({ where: { id: String(orderId) } });
            if (order && order.items) {
                for (const item of order.items) {
                    const productId = item._id || item.id;
                    if (productId) {
                        await prisma.product.update({
                            where: { id: String(productId) },
                            data: { stock: { increment: item.quantity } }
                        });
                    }
                }
            }
            await prisma.order.delete({ where: { id: String(orderId) } })
            res.json({success:false})
        }
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}


const placeOrderRazorpay = async (req,res) => {
    try {
        
        const { userId, items, amount, address, couponCode } = req.body

        // Validate stock
        await validateAndDecrementStock(items);

        // Apply coupon if provided
        const { discount, finalAmount } = await applyCoupon(couponCode, amount);

        const orderData = {
            userId: String(userId),
            items,
            address,
            amount: finalAmount,
            paymentMethod:"Razorpay",
            payment:false,
            date: String(Date.now()),
            couponCode: couponCode ? couponCode.toUpperCase() : null,
            discount: discount || null
        }

        const newOrder = await prisma.order.create({ data: orderData })

        const options = {
            amount: finalAmount * 100,
            currency: currency.toUpperCase(),
            receipt : newOrder.id.toString()
        }

        await razorpayInstance.orders.create(options, (error,order)=>{
            if (error) {
                console.log(error)
                return res.json({success:false, message: error})
            }
            res.json({success:true,order})
        })

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const verifyRazorpay = async (req,res) => {
    try {
        
        const { userId, razorpay_order_id  } = req.body

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        if (orderInfo.status === 'paid') {
            await prisma.order.update({ where: { id: String(orderInfo.receipt) }, data: { payment: true } });
            await prisma.user.update({ where: { id: String(userId) }, data: { cartData: {} } })

            // Send order confirmation email
            const order = await prisma.order.findUnique({ where: { id: String(orderInfo.receipt) } });
            const user = await getUserEmail(userId);
            if (user && order) {
                sendOrderConfirmationEmail(user.email, {
                    orderId: order.id,
                    items: order.items,
                    amount: order.amount,
                    discount: order.discount,
                    address: order.address,
                    paymentMethod: "Razorpay",
                    userName: user.name
                });
            }

            res.json({ success: true, message: "Payment completed successfully" })
        } else {
             res.json({ success: false, message: 'Payment Failed' });
        }

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}



const allOrders = async (req,res) => {

    try {
        
        const orders = await prisma.order.findMany({})
        res.json({success:true,orders})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}


const userOrders = async (req,res) => {
    try {
        
        const { userId } = req.body

        const orders = await prisma.order.findMany({ where: { userId: String(userId) } })
        res.json({success:true,orders})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


const updateStatus = async (req,res) => {
    try {
        
        const { orderId, status } = req.body

        await prisma.order.update({ where: { id: String(orderId) }, data: { status } })
        res.json({success:true,message:'Order status updated'})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export {verifyRazorpay, verifyStripe ,placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus}