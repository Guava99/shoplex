import React from 'react';
import Title from '../components/Title';

const Privacy = () => {
  return (
    <div className='pt-10 pb-20 page-transition'>
      <div className='text-center text-2xl mb-10 border-t pt-10'>
        <Title text1={'PRIVACY'} text2={'POLICY'} />
      </div>

      <div className='max-w-3xl mx-auto space-y-8 text-sm text-[var(--ink-soft)] leading-relaxed'>
        <div className='modern-card p-6 sm:p-8'>
          <p className='text-xs text-[var(--ink-muted)] font-bold uppercase tracking-wider mb-4'>
            Last updated: July 2026
          </p>
          <p>
            At Shoplex, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, 
            and safeguard your information when you visit our website or make a purchase.
          </p>
        </div>

        <section>
          <h2 className='text-lg font-bold text-[var(--ink)] mb-3 flex items-center gap-2'>
            <span className='w-7 h-7 bg-[var(--accent-soft)] text-[var(--accent)] rounded-lg flex items-center justify-center text-xs font-extrabold'>1</span>
            Information We Collect
          </h2>
          <div className='space-y-3 pl-9'>
            <p><strong className='text-[var(--ink)]'>Personal Information:</strong> When you create an account or place an order, we collect your name, email address, phone number, and delivery address.</p>
            <p><strong className='text-[var(--ink)]'>Payment Information:</strong> Payment details are processed securely through Stripe and Razorpay. We do not store your full credit card numbers on our servers.</p>
            <p><strong className='text-[var(--ink)]'>Usage Data:</strong> We may collect information about how you interact with our website, including pages visited, time spent, and browsing patterns.</p>
            <p><strong className='text-[var(--ink)]'>Device Information:</strong> We may collect device type, browser type, IP address, and operating system information for analytics and security purposes.</p>
          </div>
        </section>

        <section>
          <h2 className='text-lg font-bold text-[var(--ink)] mb-3 flex items-center gap-2'>
            <span className='w-7 h-7 bg-[var(--accent-soft)] text-[var(--accent)] rounded-lg flex items-center justify-center text-xs font-extrabold'>2</span>
            How We Use Your Information
          </h2>
          <div className='space-y-3 pl-9'>
            <p>We use the information we collect to:</p>
            <ul className='list-disc pl-6 space-y-2'>
              <li>Process and fulfill your orders</li>
              <li>Send order confirmations and delivery updates</li>
              <li>Manage your account and provide customer support</li>
              <li>Send promotional emails and newsletters (with your consent)</li>
              <li>Improve our website, products, and services</li>
              <li>Detect and prevent fraud or unauthorized activity</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className='text-lg font-bold text-[var(--ink)] mb-3 flex items-center gap-2'>
            <span className='w-7 h-7 bg-[var(--accent-soft)] text-[var(--accent)] rounded-lg flex items-center justify-center text-xs font-extrabold'>3</span>
            Data Sharing
          </h2>
          <div className='space-y-3 pl-9'>
            <p>We do not sell your personal information to third parties. We may share your data with:</p>
            <ul className='list-disc pl-6 space-y-2'>
              <li><strong className='text-[var(--ink)]'>Payment Processors:</strong> Stripe and Razorpay, to process your transactions securely</li>
              <li><strong className='text-[var(--ink)]'>Shipping Partners:</strong> To deliver your orders</li>
              <li><strong className='text-[var(--ink)]'>Cloud Services:</strong> Cloudinary for image storage and optimization</li>
              <li><strong className='text-[var(--ink)]'>Legal Requirements:</strong> When required by law or to protect our rights</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className='text-lg font-bold text-[var(--ink)] mb-3 flex items-center gap-2'>
            <span className='w-7 h-7 bg-[var(--accent-soft)] text-[var(--accent)] rounded-lg flex items-center justify-center text-xs font-extrabold'>4</span>
            Cookies & Tracking
          </h2>
          <div className='space-y-3 pl-9'>
            <p>We use cookies and local storage to:</p>
            <ul className='list-disc pl-6 space-y-2'>
              <li>Keep you logged in across sessions</li>
              <li>Remember your currency preferences</li>
              <li>Store your shopping cart data</li>
              <li>Analyze website traffic and performance</li>
            </ul>
            <p>You can control cookies through your browser settings. Disabling cookies may affect some website functionality.</p>
          </div>
        </section>

        <section>
          <h2 className='text-lg font-bold text-[var(--ink)] mb-3 flex items-center gap-2'>
            <span className='w-7 h-7 bg-[var(--accent-soft)] text-[var(--accent)] rounded-lg flex items-center justify-center text-xs font-extrabold'>5</span>
            Data Security
          </h2>
          <div className='space-y-3 pl-9'>
            <p>We implement industry-standard security measures to protect your personal information, including:</p>
            <ul className='list-disc pl-6 space-y-2'>
              <li>Password hashing using bcrypt</li>
              <li>JWT-based authentication tokens</li>
              <li>HTTPS encryption for all data transmission</li>
              <li>CORS protection against unauthorized access</li>
            </ul>
            <p>However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.</p>
          </div>
        </section>

        <section>
          <h2 className='text-lg font-bold text-[var(--ink)] mb-3 flex items-center gap-2'>
            <span className='w-7 h-7 bg-[var(--accent-soft)] text-[var(--accent)] rounded-lg flex items-center justify-center text-xs font-extrabold'>6</span>
            Your Rights
          </h2>
          <div className='space-y-3 pl-9'>
            <p>You have the right to:</p>
            <ul className='list-disc pl-6 space-y-2'>
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your account and associated data</li>
              <li>Opt out of marketing communications at any time</li>
              <li>Withdraw consent for data processing</li>
            </ul>
            <p>To exercise any of these rights, please contact us at <a href="mailto:support@shoplex.com" className='text-[var(--accent)] font-semibold hover:underline'>support@shoplex.com</a>.</p>
          </div>
        </section>

        <section>
          <h2 className='text-lg font-bold text-[var(--ink)] mb-3 flex items-center gap-2'>
            <span className='w-7 h-7 bg-[var(--accent-soft)] text-[var(--accent)] rounded-lg flex items-center justify-center text-xs font-extrabold'>7</span>
            Contact Us
          </h2>
          <div className='pl-9'>
            <p>If you have any questions about this Privacy Policy, please contact us:</p>
            <div className='mt-3 space-y-1'>
              <p><strong className='text-[var(--ink)]'>Email:</strong> <a href="mailto:support@shoplex.com" className='text-[var(--accent)] font-semibold hover:underline'>support@shoplex.com</a></p>
              <p><strong className='text-[var(--ink)]'>Phone:</strong> +1 (555) 123-4567</p>
              <p><strong className='text-[var(--ink)]'>Hours:</strong> Mon–Fri, 9AM–6PM EST</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Privacy;
