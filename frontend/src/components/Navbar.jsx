import React, { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import CurrencySwitcher from './CurrencySwitcher';

const Navbar = () => {

    const [visible, setVisible] = useState(false);
    const [theme, setTheme] = useState(() => {
        const stored = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', stored);
        return stored;
    });

    const toggleTheme = () => {
        const nextTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(nextTheme);
        document.documentElement.setAttribute('data-theme', nextTheme);
        localStorage.setItem('theme', nextTheme);
    };

    const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems, wishlist, setCartOpen } = useContext(ShopContext);

    const logout = () => {
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
    }

    return (
        <nav className='glass-effect sticky top-0 z-50 border-b border-[var(--border)]'>
            <div className='flex items-center justify-between py-4 px-4 sm:px-8 max-w-[1400px] mx-auto'>

                {/* Logo */}
                <Link to='/' className='flex items-center gap-1'>
                    <span className='font-heading text-xl sm:text-2xl font-800 tracking-[0.08em] uppercase' style={{color: 'var(--ink)'}}>
                        Shop<span className='text-[var(--accent)]'>lex</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <ul className='hidden lg:flex items-center gap-1'>
                    {[
                        { to: '/', label: 'Home' },
                        { to: '/collection', label: 'Shop' },
                        { to: '/about', label: 'About' },
                        { to: '/contact', label: 'Contact' },
                    ].map(({ to, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                `relative px-5 py-2 text-sm font-medium transition-colors duration-200
                                ${isActive 
                                    ? 'text-[var(--ink)]' 
                                    : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    {label}
                                    {isActive && (
                                        <span className='absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-[2px] bg-[var(--accent)] rounded-full'></span>
                                    )}
                                </>
                            )}
                        </NavLink>
                    ))}
                </ul>

                {/* Actions */}
                <div className='flex items-center gap-2 sm:gap-3'>
                    <div className='hidden lg:block'>
                        <CurrencySwitcher />
                    </div>

                    {/* Search */}
                    <button 
                        onClick={() => { setShowSearch(true); navigate('/collection') }}
                        className='w-9 h-9 flex items-center justify-center rounded-lg text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--surface-elevated)] transition-all duration-200'
                    >
                        <svg className='w-[18px] h-[18px]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.8} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
                        </svg>
                    </button>

                    {/* Theme Toggle (Calm Mode) */}
                    <button 
                        onClick={toggleTheme}
                        className='w-9 h-9 flex items-center justify-center rounded-lg text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--surface-elevated)] transition-all duration-200'
                        title={theme === 'light' ? 'Switch to Calm Mode' : 'Switch to Light Mode'}
                    >
                        {theme === 'light' ? (
                            <svg className='w-[18px] h-[18px]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.8} d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z' />
                            </svg>
                        ) : (
                            <svg className='w-[18px] h-[18px]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.8} d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z' />
                            </svg>
                        )}
                    </button>

                    {/* Profile / Login */}
                    <div className='relative'>
                        {token ? (
                            <button className='w-9 h-9 flex items-center justify-center rounded-lg text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--surface-elevated)] transition-all duration-200 group'>
                                <svg className='w-[18px] h-[18px]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.8} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                                </svg>

                                {/* Dropdown */}
                                <div className='absolute top-full right-0 mt-2 w-52 bg-[var(--surface)] rounded-xl border border-[var(--border)] shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden'>
                                    <div className='px-4 py-3 border-b border-[var(--border)]'>
                                        <p className='text-sm font-semibold' style={{color: 'var(--ink)'}}>My Account</p>
                                    </div>
                                    <button onClick={() => navigate('/orders')} className='w-full text-left px-4 py-2.5 text-sm text-[var(--ink-soft)] hover:bg-[var(--surface-elevated)] hover:text-[var(--ink)] transition-colors flex items-center gap-3'>
                                        <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.8} d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' />
                                        </svg>
                                        Orders
                                    </button>
                                    <button onClick={() => navigate('/profile')} className='w-full text-left px-4 py-2.5 text-sm text-[var(--ink-soft)] hover:bg-[var(--surface-elevated)] hover:text-[var(--ink)] transition-colors flex items-center gap-3'>
                                        <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.8} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                                        </svg>
                                        Profile
                                    </button>
                                    <div className='border-t border-[var(--border)]'>
                                        <button onClick={logout} className='w-full text-left px-4 py-2.5 text-sm text-[var(--error)] hover:bg-[var(--error-soft)] transition-colors flex items-center gap-3'>
                                            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.8} d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' />
                                            </svg>
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            </button>
                        ) : (
                            <button
                                onClick={() => navigate('/login')}
                                className='hidden sm:flex items-center gap-2 text-sm font-semibold text-[var(--ink)] hover:text-[var(--accent)] transition-colors'
                            >
                                Sign In
                            </button>
                        )}
                    </div>

                    {/* Wishlist */}
                    <Link to='/wishlist' className='relative'>
                        <div className='w-9 h-9 flex items-center justify-center rounded-lg text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--surface-elevated)] transition-all duration-200'>
                            <svg className='w-[18px] h-[18px]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.8} d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' />
                            </svg>
                        </div>
                        {wishlist.length > 0 && (
                            <span className='absolute -top-1 -right-1 w-4 h-4 bg-[var(--accent)] text-white rounded-full text-[10px] font-bold flex items-center justify-center'>
                                {wishlist.length}
                            </span>
                        )}
                    </Link>

                    {/* Cart */}
                    <button 
                        onClick={() => setCartOpen(true)}
                        className='relative w-9 h-9 flex items-center justify-center rounded-lg text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--surface-elevated)] transition-all duration-200'
                    >
                        <svg className='w-[18px] h-[18px]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.8} d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' />
                        </svg>
                        {getCartCount() > 0 && (
                            <span className='absolute -top-1 -right-1 w-4 h-4 bg-[var(--ink)] text-white rounded-full text-[10px] font-bold flex items-center justify-center'>
                                {getCartCount()}
                            </span>
                        )}
                    </button>

                    {/* Mobile Login */}
                    {!token && (
                        <button
                            onClick={() => navigate('/login')}
                            className='sm:hidden w-9 h-9 flex items-center justify-center rounded-lg text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--surface-elevated)] transition-all duration-200'
                        >
                            <svg className='w-[18px] h-[18px]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.8} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                            </svg>
                        </button>
                    )}

                    {/* Mobile Menu Toggle */}
                    <button onClick={() => setVisible(true)} className='w-9 h-9 flex items-center justify-center rounded-lg text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--surface-elevated)] transition-all duration-200 lg:hidden'>
                        <svg className='w-[18px] h-[18px]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.8} d='M4 6h16M4 12h16M4 18h16' />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Drawer — Backdrop */}
            <div 
                className={`lg:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-[99] transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setVisible(false)}
            />

            {/* Mobile Drawer — Panel */}
            <div className={`lg:hidden fixed top-0 right-0 bottom-0 w-[300px] max-w-[85vw] bg-[var(--surface)] z-[100] shadow-xl transition-transform duration-300 ease-out ${visible ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className='flex flex-col h-full'>

                    {/* Drawer Header */}
                    <div className='flex items-center justify-between p-6 border-b border-[var(--border)]'>
                        <span className='font-heading text-lg font-bold tracking-wider uppercase' style={{color: 'var(--ink)'}}>Menu</span>
                        <button onClick={() => setVisible(false)} className='w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[var(--surface-elevated)] transition-colors'>
                            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.8} d='M6 18L18 6M6 6l12 12' />
                            </svg>
                        </button>
                    </div>

                    {/* Drawer Links */}
                    <div className='flex-1 p-4 space-y-1'>
                        {[
                            { to: '/', label: 'Home', icon: '🏠' },
                            { to: '/collection', label: 'Shop', icon: '🛍️' },
                            { to: '/about', label: 'About', icon: '✨' },
                            { to: '/contact', label: 'Contact', icon: '💬' },
                        ].map(({ to, label, icon }) => (
                            <NavLink
                                key={to}
                                to={to}
                                onClick={() => setVisible(false)}
                                className={({ isActive }) =>
                                    `flex items-center gap-4 py-3.5 px-5 rounded-xl font-medium text-sm transition-all duration-200
                                    ${isActive 
                                        ? 'bg-[var(--accent-soft)] text-[var(--accent)]' 
                                        : 'text-[var(--ink-soft)] hover:bg-[var(--surface-elevated)] hover:text-[var(--ink)]'
                                    }`
                                }
                            >
                                <span className='text-lg'>{icon}</span>
                                {label}
                            </NavLink>
                        ))}
                    </div>

                    {/* Drawer Footer */}
                    <div className='p-6 border-t border-[var(--border)] bg-[var(--surface-elevated)]'>
                        <CurrencySwitcher />
                        <p className='text-center text-xs text-[var(--ink-muted)] mt-4'>© 2026 Shoplex</p>
                    </div>
                </div>
            </div>

        </nav>
    )
}

export default Navbar
