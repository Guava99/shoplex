import React from 'react';
import Title from '../components/Title';

const Terms = () => {
  return (
    <div className='pt-10 pb-20 page-transition'>
      <div className='text-center text-2xl mb-10 border-t pt-10'>
        <Title text1={'TERMS OF'} text2={'SERVICE'} />
      </div>

      <div className='max-w-3xl mx-auto space-y-8 text-sm text-[var(--ink-soft)] leading-relaxed'>
        <div className='modern-card p-6 sm:p-8'>
          <p className='text-xs text-[var(--ink-muted)] font-bold uppercase tracking-wider mb-4'>
            Last updated: July 2026
          </p>
          <p>
            Welcome to Shoplex. By accessing and using our website, you accept and agree to be bound by the terms 
            and conditions outlined below. Please read them carefully before making any purchase.
          </p>
        </div>

        <section>
          <h2 className='text-lg font-bold text-[var(--ink)] mb-3 flex items-center gap-2'>
            <span className='w-7 h-7 bg-[var(--accent-soft)] text-[var(--accent)] rounded-lg flex items-center justify-center text-xs font-extrabold'>1</span>
            General Terms
          </h2>
          <div className='space-y-3 pl-9'>
            <p>By using the Shoplex platform, you agree to comply with all applicable local and international laws regarding online commerce.</p>
            <p>We reserve the right to modify these terms at any time. Continued use of the site after changes constitutes acceptance of the new terms.</p>
            <p>You must be at least 18 years old, or have parental/guardian consent, to make purchases on our platform.</p>
          </div>
        </section>

        <section>
          <h2 className='text-lg font-bold text-[var(--ink)] mb-3 flex items-center gap-2'>
            <span className='w-7 h-7 bg-[var(--accent-soft)] text-[var(--accent)] rounded-lg flex items-center justify-center text-xs font-extrabold'>2</span>
            Products & Pricing
          </h2>
          <div className='space-y-3 pl-9'>
            <p>All product descriptions, images, and specifications are provided as accurately as possible. However, we do not guarantee that colors displayed on your screen are exact representations.</p>
            <p>Prices are listed in Indian Rupees (₹) and may be converted to your local currency for display purposes. All prices include applicable taxes unless stated otherwise.</p>
            <p>We reserve the right to change prices at any time without prior notice. Any price in effect at the time of your order will be honored.</p>
          </div>
        </section>

        <section>
          <h2 className='text-lg font-bold text-[var(--ink)] mb-3 flex items-center gap-2'>
            <span className='w-7 h-7 bg-[var(--accent-soft)] text-[var(--accent)] rounded-lg flex items-center justify-center text-xs font-extrabold'>3</span>
            Orders & Payments
          </h2>
          <div className='space-y-3 pl-9'>
            <p>When you place an order, you are making an offer to purchase. We reserve the right to accept or decline any order.</p>
            <p>We accept payments via Stripe (credit/debit cards), Razorpay, and Cash on Delivery (COD). All online payments are processed securely through our payment partners.</p>
            <p>Orders are subject to product availability. If an item becomes unavailable after you place your order, we will notify you and offer a full refund.</p>
          </div>
        </section>

        <section>
          <h2 className='text-lg font-bold text-[var(--ink)] mb-3 flex items-center gap-2'>
            <span className='w-7 h-7 bg-[var(--accent-soft)] text-[var(--accent)] rounded-lg flex items-center justify-center text-xs font-extrabold'>4</span>
            Shipping & Delivery
          </h2>
          <div className='space-y-3 pl-9'>
            <p>Delivery times vary based on location and product availability. Estimated delivery timelines are provided at checkout.</p>
            <p>A flat delivery fee applies to all orders. Free shipping may be available on orders above a certain value, as indicated during checkout.</p>
            <p>Risk of loss and title for items pass to you upon delivery to the carrier.</p>
          </div>
        </section>

        <section>
          <h2 className='text-lg font-bold text-[var(--ink)] mb-3 flex items-center gap-2'>
            <span className='w-7 h-7 bg-[var(--accent-soft)] text-[var(--accent)] rounded-lg flex items-center justify-center text-xs font-extrabold'>5</span>
            Returns & Refunds
          </h2>
          <div className='space-y-3 pl-9'>
            <p>You may return most items within 7 days of delivery for a full refund. Items must be unused, unwashed, and in their original packaging with all tags attached.</p>
            <p>To initiate a return, please contact our support team at support@shoplex.com with your order details.</p>
            <p>Refunds will be processed to the original payment method within 5–10 business days after we receive the returned item.</p>
            <p>Certain items such as undergarments, swimwear, and personalized/customized products are not eligible for returns.</p>
          </div>
        </section>

        <section>
          <h2 className='text-lg font-bold text-[var(--ink)] mb-3 flex items-center gap-2'>
            <span className='w-7 h-7 bg-[var(--accent-soft)] text-[var(--accent)] rounded-lg flex items-center justify-center text-xs font-extrabold'>6</span>
            Account Security
          </h2>
          <div className='space-y-3 pl-9'>
            <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.</p>
            <p>Please notify us immediately of any unauthorized use of your account.</p>
          </div>
        </section>

        <section>
          <h2 className='text-lg font-bold text-[var(--ink)] mb-3 flex items-center gap-2'>
            <span className='w-7 h-7 bg-[var(--accent-soft)] text-[var(--accent)] rounded-lg flex items-center justify-center text-xs font-extrabold'>7</span>
            Contact
          </h2>
          <div className='pl-9'>
            <p>For any questions regarding these Terms of Service, please contact us at <a href="mailto:support@shoplex.com" className='text-[var(--accent)] font-semibold hover:underline'>support@shoplex.com</a>.</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Terms;
