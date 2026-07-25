import { Link } from 'react-router-dom'

const Navbar = ({ setToken }) => {
  return (
    <div className='bg-white flex items-center justify-between py-4 px-8 border-b border-orange-200/60 sticky top-0 z-50 shadow-[0_2px_15px_rgba(139,69,19,0.02)]'>
      <div className='flex items-center gap-4'>
        <Link to='/' className='flex items-center gap-4 cursor-pointer'>
          <div className='w-12 h-12 bg-gradient-to-br from-amber-600 to-orange-600 rounded-2xl flex items-center justify-center text-white shadow-md'>
            <svg className='w-7 h-7' fill='currentColor' viewBox='0 0 24 24'>
              <path d='M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' />
            </svg>
          </div>
          <div>
            <h1 className='playfair text-2xl font-bold text-amber-900 leading-tight'>Admin Dashboard</h1>
            <p className='text-xs font-bold text-orange-500 uppercase tracking-widest'>Commerce Portal</p>
          </div>
        </Link>
      </div>
      <button onClick={() => setToken('')} className='btn-primary flex items-center gap-2 !py-2.5 !px-6 !text-sm'>
        <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' />
        </svg>
        <span>Logout</span>
      </button>
    </div>
  )
}

export default Navbar