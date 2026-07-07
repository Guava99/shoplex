import React, { useContext, useState, useEffect } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { CheckCircle2, Loader2, ShieldCheck, ShoppingBag, PackageCheck } from 'lucide-react'

const PlaceOrder = () => {

    const [method, setMethod] = useState('cod');
    const { navigate, backendUrl, token, logout, cartItems, setCartItems, getCartAmount, delivery_fee, products, currency } = useContext(ShopContext);

    // Instant Feedback & Success Modal States
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const [processingMessage, setProcessingMessage] = useState('');
    const [orderSuccess, setOrderSuccess] = useState(null);

    useEffect(() => {
        if (!token) {
            toast.error('Please login to place an order');
            navigate('/login');
        }
    }, [token]);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    })

    // Coupon state
    const [couponCode, setCouponCode] = useState('')
    const [couponApplied, setCouponApplied] = useState(null) // { code, discountPercent }
    const [couponLoading, setCouponLoading] = useState(false)

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setFormData(data => ({ ...data, [name]: value }))
    }

    const handleApplyCoupon = async () => {
        if (!couponCode.trim()) {
            toast.error('Please enter a coupon code');
            return;
        }

        setCouponLoading(true);
        try {
            const response = await axios.post(
                backendUrl + '/api/coupon/validate',
                { code: couponCode, orderAmount: getCartAmount() },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.success) {
                setCouponApplied(response.data.coupon);
                toast.success(`Coupon applied! ${response.data.coupon.discountPercent}% off`);
            } else {
                toast.error(response.data.message);
                setCouponApplied(null);
            }
        } catch (error) {
            toast.error('Failed to validate coupon');
            setCouponApplied(null);
        } finally {
            setCouponLoading(false);
        }
    }

    const removeCoupon = () => {
        setCouponApplied(null);
        setCouponCode('');
        toast.info('Coupon removed');
    }

    const getDiscountAmount = () => {
        if (!couponApplied) return 0;
        return Math.round((getCartAmount() * couponApplied.discountPercent) / 100);
    }

    const getFinalAmount = () => {
        const subtotal = getCartAmount();
        const discount = getDiscountAmount();
        return subtotal - discount + delivery_fee;
    }

    const initPay = (order) => {
        setIsPlacingOrder(false); // Hand over to Razorpay SDK modal
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'Order Payment',
            description: 'Order Payment',
            order_id: order.id,
            receipt: order.receipt,
            modal: {
                ondismiss: () => {
                    setIsPlacingOrder(false);
                }
            },
            handler: async (response) => {
                console.log(response)
                setIsPlacingOrder(true);
                setProcessingMessage('Verifying payment confirmation...');
                try {
                    const { data } = await axios.post(backendUrl + '/api/order/verifyRazorpay', response, { headers: { Authorization: `Bearer ${token}` } })
                    setIsPlacingOrder(false);
                    if (data.success) {
                        setCartItems({});
                        setOrderSuccess({
                            orderId: order.id || `ORD-${Date.now().toString().slice(-6)}`,
                            amount: getFinalAmount(),
                            paymentMethod: 'Razorpay Online',
                            address: formData
                        });
                    } else {
                        toast.error(data.message || 'Payment verification failed');
                    }
                } catch (error) {
                    setIsPlacingOrder(false);
                    console.log(error)
                    toast.error(error.message || 'Payment verification failed')
                }
            }
        }
        const rzp = new window.Razorpay(options)
        rzp.open()
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        try {
            let orderItems = []
            const productMap = new Map(products.map(p => [p._id, p]));

            for (const itemId in cartItems) {
                for (const size in cartItems[itemId]) {
                    if (cartItems[itemId][size] > 0) {
                        const product = productMap.get(itemId);
                        if (product) {
                            const itemInfo = structuredClone(product)
                            itemInfo.size = size
                            itemInfo.quantity = cartItems[itemId][size]
                            orderItems.push(itemInfo)
                        }
                    }
                }
            }

            if (orderItems.length === 0) {
                toast.error('Your cart is empty');
                return;
            }

            // Immediately show processing overlay
            setIsPlacingOrder(true);
            if (method === 'razorpay') {
                setProcessingMessage('Connecting to secure Razorpay gateway...');
            } else if (method === 'stripe') {
                setProcessingMessage('Redirecting to secure Stripe checkout...');
            } else {
                setProcessingMessage('Confirming your order details...');
            }

            let orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee,
                couponCode: couponApplied ? couponApplied.code : null
            }

            switch (method) {
                case 'cod':
                    const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { Authorization: `Bearer ${token}` } })
                    setIsPlacingOrder(false);
                    if (response.data.success) {
                        setCartItems({});
                        setOrderSuccess({
                            orderId: response.data.orderId || `ORD-${Date.now().toString().slice(-6)}`,
                            amount: getFinalAmount(),
                            paymentMethod: 'Cash on Delivery',
                            address: formData
                        });
                    } else {
                        if (response.data.message === 'Invalid token' || response.data.message === 'Not Authorized Login Again') {
                            logout();
                            toast.error('Session expired. Please login again');
                            navigate('/login');
                        } else {
                            toast.error(response.data.message)
                        }
                    }
                    break;

                case 'stripe':
                    const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, { headers: { Authorization: `Bearer ${token}` } })
                    if (responseStripe.data.success) {
                        const { session_url } = responseStripe.data
                        window.location.replace(session_url)
                    } else {
                        setIsPlacingOrder(false);
                        if (responseStripe.data.message === 'Invalid token' || responseStripe.data.message === 'Not Authorized Login Again') {
                            logout();
                            toast.error('Session expired. Please login again');
                            navigate('/login');
                        } else {
                            toast.error(responseStripe.data.message)
                        }
                    }
                    break;

                case 'razorpay':
                    const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, { headers: { Authorization: `Bearer ${token}` } })
                    if (responseRazorpay.data.success) {
                        initPay(responseRazorpay.data.order)
                    } else {
                        setIsPlacingOrder(false);
                        if (responseRazorpay.data.message === 'Invalid token' || responseRazorpay.data.message === 'Not Authorized Login Again') {
                            logout();
                            toast.error('Session expired. Please login again');
                            navigate('/login');
                        } else {
                            toast.error(responseRazorpay.data.message)
                        }
                    }
                    break;

                default:
                    setIsPlacingOrder(false);
                    break;
            }

        } catch (error) {
            setIsPlacingOrder(false);
            console.log(error)
            toast.error(error.message)
        }
    }


    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>

            <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>

                <div className='text-xl sm:text-2xl my-3'>
                    <Title text1={'DELIVERY'} text2={'INFORMATION'} />
                </div>
                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First name' />
                    <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last name' />
                </div>
                <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email address' />
                <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street' />
                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' />
                    <input onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State' />
                </div>
                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Zipcode' />
                    <input required onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country' />
                </div>
                <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Phone' />
            </div>


            <div className='mt-8'>

                <div className='mt-8 w-full'>
                    <CartTotal discount={getDiscountAmount()} couponCode={couponApplied?.code} />
                </div>

                {/* Coupon Code Section */}
                <div className='mt-6 p-4 border border-[var(--border)] rounded-xl bg-[var(--surface-elevated)]'>
                    <p className='text-xs font-bold uppercase tracking-wider text-[var(--ink)] mb-3 flex items-center gap-2'>
                        <svg className='w-4 h-4 text-[var(--accent)]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.8} d='M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z' />
                        </svg>
                        Promo Code
                    </p>

                    {couponApplied ? (
                        <div className='flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-4 py-3'>
                            <div className='flex items-center gap-2'>
                                <svg className='w-5 h-5 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                                </svg>
                                <div>
                                    <span className='font-bold text-green-800 text-sm'>{couponApplied.code}</span>
                                    <span className='text-green-600 text-xs ml-2'>({couponApplied.discountPercent}% off)</span>
                                </div>
                            </div>
                            <button
                                type='button'
                                onClick={removeCoupon}
                                className='text-red-500 hover:text-red-700 text-xs font-bold uppercase transition-colors'
                            >
                                Remove
                            </button>
                        </div>
                    ) : (
                        <div className='flex gap-2'>
                            <input
                                type='text'
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                placeholder='Enter coupon code'
                                className='flex-1 border border-gray-300 rounded-lg py-2.5 px-4 text-sm font-medium uppercase tracking-wider focus:outline-none focus:border-[var(--ink)] transition-colors'
                            />
                            <button
                                type='button'
                                onClick={handleApplyCoupon}
                                disabled={couponLoading}
                                className='px-5 py-2.5 bg-[var(--ink)] text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[var(--accent)] transition-colors disabled:opacity-50'
                            >
                                {couponLoading ? '...' : 'Apply'}
                            </button>
                        </div>
                    )}
                </div>

                <div className='mt-12'>
                    <Title text1={'PAYMENT'} text2={'METHOD'} />

                    <div className='flex gap-3 flex-col lg:flex-row'>
                        <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer hover:bg-gray-50 transition-colors rounded-lg'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
                            <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
                        </div>
                        <div onClick={() => setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer hover:bg-gray-50 transition-colors rounded-lg'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
                            <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
                        </div>
                        <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer hover:bg-gray-50 transition-colors rounded-lg'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
                            <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
                        </div>
                    </div>

                    <div className='w-full text-end mt-8'>
                        <button
                            type='submit'
                            disabled={isPlacingOrder}
                            className='bg-black text-white px-10 py-3.5 text-sm font-semibold rounded-full hover:bg-gray-800 transition-all flex items-center justify-center gap-2 w-full sm:w-auto min-w-[200px] ml-auto disabled:opacity-75 disabled:cursor-not-allowed shadow-md hover:shadow-lg'
                        >
                            {isPlacingOrder ? (
                                <>
                                    <Loader2 className='w-4 h-4 animate-spin' />
                                    <span>Processing...</span>
                                </>
                            ) : (
                                <span>PLACE ORDER</span>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Instant Processing Loading Modal / Overlay */}
            {isPlacingOrder && (
                <div className='fixed inset-0 z-[120] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in'>
                    <div className='bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl space-y-4 animate-scale-up'>
                        <div className='relative w-16 h-16 mx-auto flex items-center justify-center'>
                            <div className='absolute inset-0 rounded-full border-4 border-gray-200 border-t-black animate-spin'></div>
                            <PackageCheck className='w-7 h-7 text-[var(--ink)] animate-pulse' />
                        </div>
                        <div>
                            <h3 className='text-lg font-bold text-[var(--ink)]'>Processing Order</h3>
                            <p className='text-xs text-[var(--ink-soft)] mt-1.5 leading-relaxed'>
                                {processingMessage || 'Securing your order and preparing payment...'}
                            </p>
                        </div>
                        <div className='pt-2 flex items-center justify-center gap-1.5 text-[11px] font-medium text-[var(--ink-muted)] border-t border-[var(--border)]'>
                            <ShieldCheck className='w-4 h-4 text-emerald-600' />
                            <span>256-bit Encrypted Checkout</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Order Confirmed Celebration Popup Modal */}
            {orderSuccess && (
                <div className='fixed inset-0 z-[130] bg-black/65 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in'>
                    <div className='bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 text-center animate-scale-up'>
                        {/* Success Icon */}
                        <div className='w-20 h-20 bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-500/30 rounded-full mx-auto flex items-center justify-center shadow-inner'>
                            <CheckCircle2 className='w-11 h-11 text-emerald-600 dark:text-emerald-400' />
                        </div>

                        <div className='space-y-1.5'>
                            <span className='px-3 py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 text-[11px] font-bold uppercase tracking-wider rounded-full'>
                                Order Confirmed
                            </span>
                            <h2 className='text-2xl font-extrabold text-[var(--ink)] pt-1'>Thank You For Your Order!</h2>
                            <p className='text-xs text-[var(--ink-soft)] leading-relaxed max-w-xs mx-auto'>
                                Your order has been placed successfully and is now being packed with care.
                            </p>
                        </div>

                        {/* Order Details Card */}
                        <div className='p-4 bg-[var(--surface-elevated)] border border-[var(--border)] rounded-2xl text-left space-y-2.5 text-xs'>
                            <div className='flex justify-between items-center pb-2 border-b border-[var(--border)]'>
                                <span className='text-[var(--ink-muted)]'>Order ID</span>
                                <span className='font-mono font-bold text-[var(--ink)]'>#{orderSuccess.orderId}</span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='text-[var(--ink-muted)]'>Total Amount</span>
                                <span className='font-bold text-[var(--ink)] text-sm'>{currency}{orderSuccess.amount}</span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='text-[var(--ink-muted)]'>Payment Method</span>
                                <span className='font-semibold text-[var(--ink)]'>{orderSuccess.paymentMethod}</span>
                            </div>
                            <div className='flex justify-between items-center pt-1 text-[11px] text-[var(--ink-soft)]'>
                                <span>Deliver to:</span>
                                <span className='font-medium text-right truncate max-w-[200px]'>
                                    {orderSuccess.address?.firstName} {orderSuccess.address?.lastName}, {orderSuccess.address?.city}
                                </span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className='flex flex-col sm:flex-row gap-3 pt-2'>
                            <button
                                type='button'
                                onClick={() => {
                                    setOrderSuccess(null);
                                    navigate('/orders');
                                }}
                                className='flex-1 btn-primary py-3 px-4 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 rounded-xl'
                            >
                                <ShoppingBag size={15} /> View My Orders
                            </button>
                            <button
                                type='button'
                                onClick={() => {
                                    setOrderSuccess(null);
                                    navigate('/collection');
                                }}
                                className='flex-1 border border-[var(--border)] hover:bg-[var(--surface-elevated)] text-[var(--ink)] py-3 px-4 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors'
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </form>
    )
}

export default PlaceOrder
