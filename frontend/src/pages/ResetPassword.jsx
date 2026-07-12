import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const ResetPassword = () => {
    const { token } = useParams()
    const { navigate, backendUrl } = useContext(ShopContext)

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Passwords do not match!')
            return
        }

        if (password.length < 6) {
            toast.error('Password must be at least 6 characters long')
            return
        }

        setIsLoading(true);

        try {
            const response = await axios.post(backendUrl + '/api/user/reset-password', {
                token,
                password
            })

            if (response.data.success) {
                toast.success('Password reset successful!')
                setTimeout(() => {
                    navigate('/login')
                }, 1500)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.error('Error:', error);
            if (error.response) {
                toast.error(error.response.data.message || 'Failed to reset password')
            } else {
                toast.error('Network error. Please try again.')
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-to-br from-orange-50 via-amber-50 to-orange-50'>
            <div className='modern-card w-full max-w-md animate-fade-in-up'>
                <form onSubmit={onSubmitHandler} className='space-y-6'>

                    <div className='text-center pb-4 border-b-2 border-orange-100'>
                        <div className='flex items-center justify-center gap-3 mb-3'>
                            <div className='w-12 h-12 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl flex items-center justify-center text-white shadow-lg'>
                                <svg className='w-7 h-7' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' />
                                </svg>
                            </div>
                            <h2 className='playfair text-4xl font-bold text-amber-800'>Reset Password</h2>
                        </div>
                        <p className='text-amber-600 font-medium'>
                            Create a new password for your account
                        </p>
                    </div>


                    <div className='space-y-4'>
                        <div className='space-y-2'>
                            <label className='flex items-center gap-2 text-sm font-bold text-amber-800'>
                                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' />
                                </svg>
                                New Password
                            </label>
                            <div className='relative'>
                                <input
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    type={showPassword ? "text" : "password"}
                                    className='w-full px-4 py-3 pr-12 border-2 border-orange-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-all bg-white hover:border-orange-300'
                                    placeholder='Enter new password'
                                    required
                                    minLength={6}
                                />
                                <button
                                    type='button'
                                    onClick={() => setShowPassword(!showPassword)}
                                    className='absolute right-4 top-1/2 -translate-y-1/2 text-amber-600 hover:text-orange-600 transition-colors'
                                >
                                    {showPassword ? (
                                        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21' />
                                        </svg>
                                    ) : (
                                        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            <p className='text-xs text-amber-600 flex items-center gap-1'>
                                <svg className='w-3 h-3' fill='currentColor' viewBox='0 0 20 20'>
                                    <path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z' clipRule='evenodd' />
                                </svg>
                                Must be at least 6 characters
                            </p>
                        </div>

                        <div className='space-y-2'>
                            <label className='flex items-center gap-2 text-sm font-bold text-amber-800'>
                                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' />
                                </svg>
                                Confirm Password
                            </label>
                            <div className='relative'>
                                <input
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    value={confirmPassword}
                                    type={showConfirmPassword ? "text" : "password"}
                                    className='w-full px-4 py-3 pr-12 border-2 border-orange-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-all bg-white hover:border-orange-300'
                                    placeholder='Confirm your password'
                                    required
                                />
                                <button
                                    type='button'
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className='absolute right-4 top-1/2 -translate-y-1/2 text-amber-600 hover:text-orange-600 transition-colors'
                                >
                                    {showConfirmPassword ? (
                                        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21' />
                                        </svg>
                                    ) : (
                                        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {password && confirmPassword && password !== confirmPassword && (
                                <p className='text-xs text-red-600 flex items-center gap-1'>
                                    <svg className='w-3 h-3' fill='currentColor' viewBox='0 0 20 20'>
                                        <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z' clipRule='evenodd' />
                                    </svg>
                                    Passwords do not match
                                </p>
                            )}
                            {password && confirmPassword && password === confirmPassword && (
                                <p className='text-xs text-green-600 flex items-center gap-1'>
                                    <svg className='w-3 h-3' fill='currentColor' viewBox='0 0 20 20'>
                                        <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                                    </svg>
                                    Passwords match
                                </p>
                            )}
                        </div>
                    </div>


                    <button
                        type='submit'
                        disabled={isLoading || password !== confirmPassword}
                        className='w-full btn-primary text-center py-4 text-lg font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                        {isLoading ? (
                            <>
                                <svg className='animate-spin h-5 w-5' fill='none' viewBox='0 0 24 24'>
                                    <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                                    <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                                </svg>
                                Resetting...
                            </>
                        ) : (
                            <>
                                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                                </svg>
                                Reset Password
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

export default ResetPassword
