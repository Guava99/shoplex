import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
    const { navigate, backendUrl } = useContext(ShopContext)
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [emailSent, setEmailSent] = useState(false)

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post(backendUrl + '/api/user/forgot-password', { email })

            if (response.data.success) {
                setEmailSent(true)
                toast.success('Password reset link sent to your email!')
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.error('Error:', error);
            if (error.response) {
                toast.error(error.response.data.message || 'Failed to send reset link')
            } else {
                toast.error('Network error. Please try again.')
            }
        } finally {
            setIsLoading(false);
        }
    }

    if (emailSent) {
        return (
            <div className='min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-to-br from-orange-50 via-amber-50 to-orange-50'>
                <div className='modern-card w-full max-w-md text-center animate-fade-in-up'>
                    <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                        <svg className='w-8 h-8 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                        </svg>
                    </div>
                    <h2 className='playfair text-3xl font-bold text-amber-800 mb-3'>Check Your Email</h2>
                    <p className='text-amber-700 mb-6'>
                        We've sent a password reset link to <strong>{email}</strong>.
                        Please check your inbox and follow the instructions to reset your password.
                    </p>
                    <div className='space-y-3'>
                        <button
                            onClick={() => navigate('/login')}
                            className='w-full btn-primary py-3 text-lg font-bold'
                        >
                            Back to Login
                        </button>
                        <button
                            onClick={() => {
                                setEmailSent(false)
                                setEmail('')
                            }}
                            className='w-full btn-secondary py-3 text-lg font-bold'
                        >
                            Send Again
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-to-br from-orange-50 via-amber-50 to-orange-50'>
            <div className='modern-card w-full max-w-md animate-fade-in-up'>
                <form onSubmit={onSubmitHandler} className='space-y-6'>

                    <div className='text-center pb-4 border-b-2 border-orange-100'>
                        <div className='flex items-center justify-center gap-3 mb-3'>
                            <div className='w-12 h-12 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl flex items-center justify-center text-white shadow-lg'>
                                <svg className='w-7 h-7' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z' />
                                </svg>
                            </div>
                            <h2 className='playfair text-4xl font-bold text-amber-800'>Forgot Password</h2>
                        </div>
                        <p className='text-amber-600 font-medium'>
                            Enter your email to receive a password reset link
                        </p>
                    </div>


                    <div className='space-y-2'>
                        <label className='flex items-center gap-2 text-sm font-bold text-amber-800'>
                            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                            </svg>
                            Email Address
                        </label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type="email"
                            className='w-full px-4 py-3 border-2 border-orange-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-all bg-white hover:border-orange-300'
                            placeholder='you@example.com'
                            required
                        />
                    </div>


                    <button
                        type='submit'
                        disabled={isLoading}
                        className='w-full btn-primary text-center py-4 text-lg font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                        {isLoading ? (
                            <>
                                <svg className='animate-spin h-5 w-5' fill='none' viewBox='0 0 24 24'>
                                    <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                                    <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                                </svg>
                                Sending...
                            </>
                        ) : (
                            <>
                                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                                </svg>
                                Send Reset Link
                            </>
                        )}
                    </button>


                    <div className='text-center'>
                        <button
                            type='button'
                            onClick={() => navigate('/login')}
                            className='text-orange-600 hover:text-orange-800 font-semibold transition-colors hover:underline inline-flex items-center gap-2'
                        >
                            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 19l-7-7m0 0l7-7m-7 7h18' />
                            </svg>
                            Back to Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword
