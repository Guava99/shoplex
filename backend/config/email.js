import nodemailer from 'nodemailer'

const getTransporter = () => {
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.ethereal.email',
        port: process.env.SMTP_PORT || 587,
        auth: {
            user: process.env.SMTP_USER || 'placeholder',
            pass: process.env.SMTP_PASS || 'placeholder'
        }
    })
}

const sendPriceDropEmail = async (userEmail, productName, oldPrice, newPrice) => {
    try {
        const transporter = getTransporter()

        const mailOptions = {
            from: '"Shoplex Alerts" <alerts@shoplex.com>',
            to: userEmail,
            subject: `🔥 Price Drop Alert: ${productName}!`,
            html: `
                <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <h2 style="color: #d97706;">Good News!</h2>
                    <p>The <strong>${productName}</strong> you saved in your wishlist just dropped in price!</p>
                    <p style="font-size: 1.2em;">
                        <span style="text-decoration: line-through; color: #999;">₹${oldPrice}</span> 
                        <span style="color: #ea580c; font-weight: bold; margin-left: 10px;">₹${newPrice}</span>
                    </p>
                    <a href="${process.env.FRONTEND_URL}/product/list" style="background: #9a3412; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 10px;">Shop Now</a>
                </div>
            `
        }

        await transporter.sendMail(mailOptions)
        console.log(`Price drop email sent to ${userEmail}`)

    } catch (error) {
        console.log("Error sending email:", error.message)
    }
}

const sendOrderConfirmationEmail = async (userEmail, orderDetails) => {
    try {
        const transporter = getTransporter()

        const { orderId, items, amount, discount, address, paymentMethod, userName } = orderDetails;

        const itemRows = (Array.isArray(items) ? items : []).map(item => `
            <tr>
                <td style="padding: 12px; border-bottom: 1px solid #f0f0f0;">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        ${item.image && item.image[0] ? `<img src="${item.image[0]}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 8px;" />` : ''}
                        <div>
                            <strong style="color: #1a1a1a;">${item.name}</strong>
                            <br/><span style="color: #888; font-size: 12px;">Size: ${item.size || 'N/A'} × ${item.quantity}</span>
                        </div>
                    </div>
                </td>
                <td style="padding: 12px; border-bottom: 1px solid #f0f0f0; text-align: right; font-weight: 600;">₹${item.price * item.quantity}</td>
            </tr>
        `).join('');

        const addr = typeof address === 'object' ? address : {};
        const addressStr = [addr.firstName, addr.lastName].filter(Boolean).join(' ') + '<br/>' +
            [addr.street, addr.city, addr.state, addr.zipcode, addr.country].filter(Boolean).join(', ');

        const mailOptions = {
            from: '"Shoplex" <orders@shoplex.com>',
            to: userEmail,
            subject: `✅ Order Confirmed — Shoplex #${orderId.slice(-8).toUpperCase()}`,
            html: `
                <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
                    <!-- Header -->
                    <div style="background: #1a1a2e; padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
                        <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 2px;">SHOPLEX</h1>
                    </div>

                    <!-- Body -->
                    <div style="padding: 30px; border: 1px solid #f0f0f0; border-top: none;">
                        <h2 style="color: #1a1a2e; margin-top: 0;">Hi ${userName || 'there'} 👋</h2>
                        <p style="color: #555; line-height: 1.6;">
                            Thank you for your order! We're getting it ready for you.
                        </p>

                        <div style="background: #f8f9fa; border-radius: 8px; padding: 16px; margin: 20px 0;">
                            <p style="margin: 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Order ID</p>
                            <p style="margin: 4px 0 0; font-weight: 700; color: #1a1a2e; font-size: 16px;">#${orderId.slice(-8).toUpperCase()}</p>
                        </div>

                        <!-- Items Table -->
                        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                            <thead>
                                <tr style="border-bottom: 2px solid #1a1a2e;">
                                    <th style="padding: 10px 12px; text-align: left; font-size: 12px; text-transform: uppercase; color: #888;">Item</th>
                                    <th style="padding: 10px 12px; text-align: right; font-size: 12px; text-transform: uppercase; color: #888;">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${itemRows}
                            </tbody>
                        </table>

                        <!-- Totals -->
                        <div style="border-top: 2px solid #1a1a2e; padding-top: 16px; margin-top: 8px;">
                            ${discount ? `
                                <div style="display: flex; justify-content: space-between; padding: 4px 0; color: #16a34a;">
                                    <span>Discount</span>
                                    <span style="font-weight: 600;">-₹${discount}</span>
                                </div>
                            ` : ''}
                            <div style="display: flex; justify-content: space-between; padding: 4px 0;">
                                <span style="color: #555;">Delivery</span>
                                <span style="font-weight: 600;">₹10</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; padding: 8px 0; font-size: 18px; font-weight: 700; color: #1a1a2e;">
                                <span>Total</span>
                                <span>₹${amount}</span>
                            </div>
                        </div>

                        <!-- Payment & Address -->
                        <div style="display: flex; gap: 20px; margin-top: 24px;">
                            <div style="flex: 1; background: #f8f9fa; border-radius: 8px; padding: 14px;">
                                <p style="margin: 0 0 4px; color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Payment</p>
                                <p style="margin: 0; font-weight: 600; color: #1a1a2e;">${paymentMethod}</p>
                            </div>
                            <div style="flex: 1; background: #f8f9fa; border-radius: 8px; padding: 14px;">
                                <p style="margin: 0 0 4px; color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Delivery To</p>
                                <p style="margin: 0; font-size: 13px; color: #1a1a2e; line-height: 1.4;">${addressStr}</p>
                            </div>
                        </div>

                        <div style="text-align: center; margin-top: 30px;">
                            <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/orders" style="background: #1a1a2e; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600; font-size: 14px;">
                                Track Your Order →
                            </a>
                        </div>
                    </div>

                    <!-- Footer -->
                    <div style="text-align: center; padding: 20px; color: #aaa; font-size: 12px;">
                        <p>Thank you for shopping with Shoplex! 💜</p>
                        <p>If you have any questions, contact us at support@shoplex.com</p>
                    </div>
                </div>
            `
        }

        await transporter.sendMail(mailOptions)
        console.log(`Order confirmation email sent to ${userEmail}`)

    } catch (error) {
        console.log("Error sending order confirmation email:", error.message)
    }
}

export { sendPriceDropEmail, sendOrderConfirmationEmail }
