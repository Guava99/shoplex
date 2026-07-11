import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import axios from 'axios'
import { toast } from 'react-toastify'
import { 
  User, Mail, MapPin, CreditCard, Package, Heart, Camera, Loader2, Save, X, Edit2, 
  Sparkles, Award, ShieldCheck, Ticket, ArrowRight, Truck, Clock, Plus, CheckCircle2 
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const { token, backendUrl, wishlist, currency, formatPrice } = useContext(ShopContext)
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    image: ''
  })
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState(false)
  const [activeTab, setActiveTab] = useState('info') // 'info', 'addresses', 'perks'
  
  // Saved Address State
  const [addresses, setAddresses] = useState(() => {
    try {
      const saved = localStorage.getItem('savedAddresses')
      if (saved) {
        const parsed = JSON.parse(saved)
        // Filter out sample address if previously cached
        const filtered = Array.isArray(parsed) ? parsed.filter(a => a.name !== 'Baby Kumari' || a.phone !== '+91 98765 43210') : []
        return filtered
      }
      return []
    } catch {
      return []
    }
  })
  const [showAddressModal, setShowAddressModal] = useState(false)
  const [newAddress, setNewAddress] = useState({
    title: 'Home',
    name: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    phone: ''
  })

  const navigate = useNavigate()

  const fetchUserData = async () => {
    try {
      if (!token) return

      const response = await axios.post(backendUrl + '/api/user/profile', {}, {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (response.data.success) {
        setUserData(response.data.user)
      }
    } catch (error) {
      console.log(error)
      toast.error('Failed to load profile data')
    }
  }

  const updateProfile = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('name', userData.name)
      formData.append('email', userData.email)

      if (image) {
        formData.append('image', image)
      }

      const response = await axios.post(backendUrl + '/api/user/update-profile', formData, {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (response.data.success) {
        toast.success('Profile updated successfully!')
        setUserData(response.data.user)
        setIsEditing(false)
        setImage(false)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error('Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  const handleAddAddress = (e) => {
    e.preventDefault()
    if (!newAddress.street || !newAddress.city || !newAddress.zipcode) {
      toast.error('Please fill required address fields')
      return
    }
    const updated = [
      ...addresses,
      { ...newAddress, id: Date.now(), isDefault: addresses.length === 0 }
    ]
    setAddresses(updated)
    localStorage.setItem('savedAddresses', JSON.stringify(updated))
    setShowAddressModal(false)
    setNewAddress({ title: 'Home', name: '', street: '', city: '', state: '', zipcode: '', phone: '' })
    toast.success('Address added successfully!')
  }

  useEffect(() => {
    fetchUserData()
  }, [token])

  return (
    <div className='border-t border-[var(--border)] pt-12 min-h-[80vh] pb-20 page-transition'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        
        {/* Header */}
        <div className='mb-10 text-center'>
          <Title text1={'MY'} text2={'ACCOUNT & PROFILE'} />
          <p className='text-xs sm:text-sm text-[var(--ink-soft)] mt-1.5'>
            Manage your profile, view loyalty rewards, and saved delivery preferences
          </p>
        </div>

        {/* Top VIP Rewards & Perks Banner (CRO Lever) */}
        <div className='mb-8 bg-gradient-to-r from-[var(--surface-dark)] via-slate-900 to-[var(--ink)] text-white p-6 sm:p-8 rounded-2xl border border-[var(--ink)] shadow-lg relative overflow-hidden'>
          <div className='absolute -right-10 -bottom-10 w-48 h-48 bg-[var(--gold)]/10 rounded-full blur-2xl pointer-events-none' />
          <div className='relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6'>
            <div className='space-y-2'>
              <div className='inline-flex items-center gap-2 px-3 py-1 bg-[var(--gold-soft)]/20 border border-[var(--gold)]/40 text-[var(--gold)] rounded-full text-xs font-bold uppercase tracking-wider'>
                <Award size={14} /> VIP Gold Member
              </div>
              <h3 className='text-2xl sm:text-3xl font-extrabold tracking-tight text-white'>
                Shoplex Rewards Balance: <span className='text-[var(--gold)] font-mono'>{currency}250</span>
              </h3>
              <p className='text-xs sm:text-sm text-white/70 max-w-xl'>
                Use your ₹250 Shoplex Cash at checkout. Plus enjoy 5% Cashback on every order and Free Priority Shipping.
              </p>
            </div>
            
            <div className='flex flex-wrap gap-3 items-center shrink-0'>
              <button 
                onClick={() => navigate('/collection')}
                className='btn-accent px-6 py-3 text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md hover:scale-105 transition-transform'
              >
                Redeem Rewards <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          
          {/* Left Sidebar - Profile Summary */}
          <div className='lg:col-span-1 space-y-6'>
            
            <div className='modern-card p-6 flex flex-col items-center text-center sticky top-24'>
              <div className='relative mb-5 group'>
                <div className='w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-[var(--gold-soft)] shadow-md relative'>
                  <img
                    src={
                      image
                        ? URL.createObjectURL(image)
                        : userData.image
                          ? userData.image
                          : `https://ui-avatars.com/api/?name=${userData.name || 'User'}&background=1a1a1a&color=fff&size=200`
                    }
                    alt="Profile"
                    className='w-full h-full object-cover'
                  />
                  <label htmlFor="image" className='absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white z-10'>
                    <Camera className='w-7 h-7' />
                  </label>
                  <input
                    onChange={(e) => setImage(e.target.files[0])}
                    type="file"
                    id="image"
                    hidden
                  />
                </div>
              </div>

              <h2 className='text-xl sm:text-2xl font-extrabold text-[var(--ink)] mb-0.5'>{userData.name || 'Valued Customer'}</h2>
              <p className='text-xs sm:text-sm text-[var(--ink-soft)] mb-6'>{userData.email}</p>

              {/* Sidebar Action Buttons */}
              <div className='w-full space-y-2.5 text-xs sm:text-sm'>
                <button
                  onClick={() => navigate('/orders')}
                  className='w-full flex items-center justify-between p-3.5 rounded-xl bg-[var(--surface-elevated)] hover:bg-[var(--accent-soft)]/40 text-[var(--ink)] transition-colors border border-[var(--border)] font-semibold group'
                >
                  <div className='flex items-center gap-3'>
                    <div className='p-2 bg-[var(--accent-soft)] rounded-lg text-[var(--accent)]'>
                      <Package size={18} />
                    </div>
                    <span>My Orders</span>
                  </div>
                  <ArrowRight size={16} className='text-[var(--ink-muted)] group-hover:translate-x-1 transition-transform' />
                </button>

                <button
                  onClick={() => navigate('/wishlist')}
                  className='w-full flex items-center justify-between p-3.5 rounded-xl bg-[var(--surface-elevated)] hover:bg-[var(--accent-soft)]/40 text-[var(--ink)] transition-colors border border-[var(--border)] font-semibold group'
                >
                  <div className='flex items-center gap-3'>
                    <div className='p-2 bg-pink-100 dark:bg-pink-900/30 rounded-lg text-pink-600'>
                      <Heart size={18} />
                    </div>
                    <span>Saved Wishlist</span>
                  </div>
                  {wishlist && wishlist.length > 0 ? (
                    <span className='bg-pink-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full'>
                      {wishlist.length}
                    </span>
                  ) : (
                    <ArrowRight size={16} className='text-[var(--ink-muted)] group-hover:translate-x-1 transition-transform' />
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('addresses')}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl transition-colors border font-semibold group ${
                    activeTab === 'addresses'
                      ? 'bg-[var(--ink)] text-white border-[var(--ink)]'
                      : 'bg-[var(--surface-elevated)] hover:bg-[var(--accent-soft)]/40 text-[var(--ink)] border-[var(--border)]'
                  }`}
                >
                  <div className='flex items-center gap-3'>
                    <div className='p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600'>
                      <MapPin size={18} />
                    </div>
                    <span>Saved Addresses</span>
                  </div>
                  <span className='text-xs font-mono font-bold'>{addresses.length}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Main Panel */}
          <div className='lg:col-span-2 space-y-6'>
            
            {/* Navigation Tabs Header */}
            <div className='flex gap-4 border-b border-[var(--border)] pb-2'>
              <button
                onClick={() => setActiveTab('info')}
                className={`pb-3 font-bold text-xs sm:text-sm uppercase tracking-wider transition-all border-b-2 -mb-[2px] flex items-center gap-2 ${
                  activeTab === 'info'
                    ? 'text-[var(--ink)] border-[var(--ink)]'
                    : 'text-[var(--ink-muted)] border-transparent hover:text-[var(--ink)]'
                }`}
              >
                <User size={16} /> Personal Info
              </button>
              <button
                onClick={() => setActiveTab('addresses')}
                className={`pb-3 font-bold text-xs sm:text-sm uppercase tracking-wider transition-all border-b-2 -mb-[2px] flex items-center gap-2 ${
                  activeTab === 'addresses'
                    ? 'text-[var(--ink)] border-[var(--ink)]'
                    : 'text-[var(--ink-muted)] border-transparent hover:text-[var(--ink)]'
                }`}
              >
                <MapPin size={16} /> Saved Delivery Addresses ({addresses.length})
              </button>
            </div>

            {/* TAB 1: Personal Information */}
            {activeTab === 'info' && (
              <div className='modern-card p-6 sm:p-8 space-y-6 animate-fade-in'>
                <div className='flex justify-between items-center border-b border-[var(--border)] pb-4'>
                  <div>
                    <h3 className='text-lg font-bold text-[var(--ink)]'>Personal Details</h3>
                    <p className='text-xs text-[var(--ink-soft)]'>Update your primary contact profile</p>
                  </div>
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className='btn-secondary px-4 py-2 text-xs font-bold flex items-center gap-1.5'
                    >
                      <Edit2 size={14} />
                      <span>Edit Details</span>
                    </button>
                  )}
                </div>

                <form onSubmit={updateProfile} className='space-y-6'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='space-y-2'>
                      <label className='text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)]'>Full Name</label>
                      <div className='relative'>
                        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                          <User className='h-4 w-4 text-[var(--ink-muted)]' />
                        </div>
                        <input
                          type='text'
                          value={userData.name}
                          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                          disabled={!isEditing}
                          className={`block w-full pl-10 pr-3 py-3 text-xs sm:text-sm border border-[var(--border)] rounded-xl outline-none transition-colors ${
                            !isEditing ? 'bg-[var(--surface-elevated)] text-[var(--ink-soft)]' : 'bg-[var(--surface)] text-[var(--ink)] focus:border-[var(--ink)]'
                          }`}
                          placeholder="Enter your name"
                        />
                      </div>
                    </div>

                    <div className='space-y-2'>
                      <label className='text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)]'>Email Address</label>
                      <div className='relative'>
                        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                          <Mail className='h-4 w-4 text-[var(--ink-muted)]' />
                        </div>
                        <input
                          type='email'
                          value={userData.email}
                          disabled
                          className='block w-full pl-10 pr-20 py-3 text-xs sm:text-sm border border-[var(--border)] rounded-xl bg-[var(--surface-elevated)] text-[var(--ink-soft)] outline-none cursor-not-allowed'
                        />
                        <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
                          <span className='text-[10px] text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full flex items-center gap-1'>
                            <CheckCircle2 size={12} /> Verified
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {isEditing && (
                    <div className='flex items-center justify-end gap-3 pt-6 border-t border-[var(--border)] animate-fade-in-up'>
                      <button
                        type='button'
                        onClick={() => {
                          setIsEditing(false)
                          fetchUserData()
                          setImage(false)
                        }}
                        className='btn-secondary px-5 py-2.5 text-xs font-bold uppercase'
                      >
                        Cancel
                      </button>
                      <button
                        type='submit'
                        disabled={loading}
                        className='btn-primary px-6 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center gap-2'
                      >
                        {loading ? <Loader2 className='w-4 h-4 animate-spin' /> : <Save size={16} />}
                        Save Changes
                      </button>
                    </div>
                  )}
                </form>
              </div>
            )}

            {/* TAB 2: Saved Delivery Addresses */}
            {activeTab === 'addresses' && (
              <div className='space-y-6 animate-fade-in'>
                <div className='flex justify-between items-center'>
                  <div>
                    <h3 className='text-lg font-bold text-[var(--ink)]'>Delivery Address Book</h3>
                    <p className='text-xs text-[var(--ink-soft)]'>Addresses saved here speed up your checkout</p>
                  </div>
                  <button
                    onClick={() => setShowAddressModal(true)}
                    className='btn-primary px-4 py-2 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5'
                  >
                    <Plus size={16} /> Add New Address
                  </button>
                </div>

                {addresses.length === 0 ? (
                  <div className='p-8 text-center rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface-elevated)]'>
                    <MapPin className='w-10 h-10 text-[var(--ink-muted)] mx-auto mb-2 opacity-40' />
                    <p className='text-sm font-semibold text-[var(--ink)]'>No saved addresses yet</p>
                    <p className='text-xs text-[var(--ink-soft)] mt-1 mb-4'>Add your delivery address to save time during checkout.</p>
                    <button
                      onClick={() => setShowAddressModal(true)}
                      className='btn-primary px-4 py-2 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5'
                    >
                      <Plus size={16} /> Add Address
                    </button>
                  </div>
                ) : (
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {addresses.map((addr) => (
                      <div
                        key={addr.id}
                        className={`p-5 rounded-2xl border transition-all ${
                          addr.isDefault
                            ? 'bg-[var(--surface-elevated)] border-[var(--ink)] shadow-xs'
                            : 'bg-[var(--surface)] border-[var(--border)]'
                        }`}
                      >
                        <div className='flex justify-between items-start mb-3'>
                          <span className='inline-flex items-center gap-1 px-2.5 py-0.5 bg-[var(--surface)] border border-[var(--border-strong)] text-[var(--ink)] rounded-full text-[10px] font-bold uppercase tracking-wider'>
                            <MapPin size={12} className='text-[var(--accent)]' /> {addr.title}
                          </span>
                          {addr.isDefault && (
                            <span className='text-[10px] bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-full'>
                              Default Address
                            </span>
                          )}
                        </div>
                        <p className='font-extrabold text-sm text-[var(--ink)]'>{addr.name}</p>
                        <p className='text-xs text-[var(--ink-soft)] mt-1 leading-relaxed'>{addr.street}</p>
                        <p className='text-xs text-[var(--ink-soft)]'>{addr.city}, {addr.state} - {addr.zipcode}</p>
                        <p className='text-xs font-medium text-[var(--ink-muted)] mt-2'>Phone: {addr.phone}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Add Address Modal */}
      {showAddressModal && (
        <div className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-fade-in'>
          <div className='bg-[var(--surface)] border border-[var(--border)] rounded-2xl max-w-md w-full p-6 relative shadow-2xl animate-fade-in-up space-y-4'>
            <div className='flex justify-between items-center border-b border-[var(--border)] pb-3'>
              <h3 className='text-base font-bold text-[var(--ink)]'>Add New Shipping Address</h3>
              <button onClick={() => setShowAddressModal(false)} className='p-1 rounded hover:bg-[var(--surface-elevated)] text-[var(--ink-muted)]'>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleAddAddress} className='space-y-3 text-xs'>
              <div>
                <label className='block font-bold text-[var(--ink-soft)] mb-1 uppercase'>Address Label (e.g. Home, Work)</label>
                <input
                  type='text'
                  value={newAddress.title}
                  onChange={(e) => setNewAddress({ ...newAddress, title: e.target.value })}
                  placeholder='Home'
                  className='w-full p-2.5 border rounded-lg bg-[var(--surface)] text-[var(--ink)] border-[var(--border)]'
                  required
                />
              </div>
              <div>
                <label className='block font-bold text-[var(--ink-soft)] mb-1 uppercase'>Full Name</label>
                <input
                  type='text'
                  value={newAddress.name}
                  onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                  placeholder='Recipient name'
                  className='w-full p-2.5 border rounded-lg bg-[var(--surface)] text-[var(--ink)] border-[var(--border)]'
                  required
                />
              </div>
              <div>
                <label className='block font-bold text-[var(--ink-soft)] mb-1 uppercase'>Street Address & House No.</label>
                <input
                  type='text'
                  value={newAddress.street}
                  onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                  placeholder='House no, street name, area'
                  className='w-full p-2.5 border rounded-lg bg-[var(--surface)] text-[var(--ink)] border-[var(--border)]'
                  required
                />
              </div>
              <div className='grid grid-cols-2 gap-2'>
                <div>
                  <label className='block font-bold text-[var(--ink-soft)] mb-1 uppercase'>City</label>
                  <input
                    type='text'
                    value={newAddress.city}
                    onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                    placeholder='City'
                    className='w-full p-2.5 border rounded-lg bg-[var(--surface)] text-[var(--ink)] border-[var(--border)]'
                    required
                  />
                </div>
                <div>
                  <label className='block font-bold text-[var(--ink-soft)] mb-1 uppercase'>Pincode</label>
                  <input
                    type='text'
                    value={newAddress.zipcode}
                    onChange={(e) => setNewAddress({ ...newAddress, zipcode: e.target.value })}
                    placeholder='6-digit pincode'
                    className='w-full p-2.5 border rounded-lg bg-[var(--surface)] text-[var(--ink)] border-[var(--border)]'
                    required
                  />
                </div>
              </div>
              <div>
                <label className='block font-bold text-[var(--ink-soft)] mb-1 uppercase'>Phone Number</label>
                <input
                  type='text'
                  value={newAddress.phone}
                  onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                  placeholder='+91 98765 43210'
                  className='w-full p-2.5 border rounded-lg bg-[var(--surface)] text-[var(--ink)] border-[var(--border)]'
                  required
                />
              </div>
              <div className='pt-3 flex justify-end gap-2'>
                <button type='button' onClick={() => setShowAddressModal(false)} className='btn-secondary px-4 py-2 uppercase'>Cancel</button>
                <button type='submit' className='btn-primary px-5 py-2 uppercase font-bold'>Save Address</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile