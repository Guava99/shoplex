import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Package, Truck, CheckCircle, Clock, MapPin, X, RotateCcw, Search, Printer, ShoppingBag, ArrowRight } from 'lucide-react';

const Orders = () => {

  const { backendUrl, token, currency, formatPrice, addToCart, setCartOpen, products, navigate } = useContext(ShopContext);

  const [orderData, setorderData] = useState([])
  const [filteredOrders, setFilteredOrders] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('All') // 'All', 'Processing', 'Delivered'
  
  const [showTracking, setShowTracking] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [showInvoice, setShowInvoice] = useState(false)

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null
      }

      const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { Authorization: `Bearer ${token}` } })
      if (response.data.success) {
        let allOrdersItem = []
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            item['orderId'] = order._id || `ORD-${Math.floor(100000 + Math.random() * 900000)}`
            allOrdersItem.push(item)
          })
        })
        const reversed = allOrdersItem.reverse()
        setorderData(reversed)
        setFilteredOrders(reversed)
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadOrderData()
  }, [token])

  // Filter & Search Logic
  useEffect(() => {
    let result = orderData.slice()

    if (activeFilter !== 'All') {
      result = result.filter(item => item.status === activeFilter)
    }

    if (searchQuery.trim()) {
      result = result.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredOrders(result)
  }, [searchQuery, activeFilter, orderData])

  const handleBuyAgain = async (productId, size) => {
    try {
      await addToCart(productId, size);
      setCartOpen(true);
      toast.success('Item added to cart!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to add item to cart');
    }
  }

  return (
    <div className='border-t border-[var(--border)] pt-12 min-h-[70vh] pb-24 page-transition'>
      
      {/* Header */}
      <div className='text-center mb-8'>
        <Title text1={'MY'} text2={'ORDERS'} />
        <p className='text-xs sm:text-sm text-[var(--ink-soft)] mt-1.5'>
          Track active shipments, view past purchases, and easily reorder your favorite fits
        </p>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className='max-w-6xl mx-auto px-4 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4'>
        
        {/* Status Filter Pills */}
        <div className='flex items-center gap-2 bg-[var(--surface-elevated)] p-1.5 rounded-xl border border-[var(--border)] w-full sm:w-auto overflow-x-auto'>
          {['All', 'Processing', 'Delivered'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all shrink-0 ${
                activeFilter === filter
                  ? 'bg-[var(--ink)] text-white shadow-xs'
                  : 'text-[var(--ink-soft)] hover:text-[var(--ink)]'
              }`}
            >
              {filter === 'All' ? 'All Orders' : filter}
            </button>
          ))}
        </div>

        {/* Live Search Input */}
        <div className='relative w-full sm:w-72'>
          <Search size={16} className='absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--ink-muted)]' />
          <input
            type='text'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder='Search orders by title...'
            className='w-full pl-10 pr-4 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-xs font-medium text-[var(--ink)] placeholder-[var(--ink-muted)] focus:border-[var(--ink)] outline-none transition-colors'
          />
        </div>
      </div>

      {/* Orders List Grid */}
      <div className='space-y-5 max-w-6xl mx-auto px-4'>
        {filteredOrders.length === 0 ? (
          <div className="text-center py-20 bg-[var(--surface-elevated)] rounded-2xl border border-dashed border-[var(--border-strong)] space-y-4">
            <Package className="mx-auto h-12 w-12 text-[var(--ink-muted)]" />
            <h3 className="text-base font-bold text-[var(--ink)]">No orders found</h3>
            <p className="text-xs text-[var(--ink-soft)] max-w-xs mx-auto">
              {searchQuery ? `No orders match "${searchQuery}"` : "You haven't placed any orders in this category yet."}
            </p>
            <button onClick={() => navigate('/collection')} className='btn-primary px-6 py-2.5 text-xs uppercase tracking-wider font-bold'>
              Start Shopping
            </button>
          </div>
        ) : (
          filteredOrders.map((item, index) => (
            <div key={index} className='modern-card flex flex-col md:flex-row md:items-center md:justify-between gap-6 p-5 sm:p-6 hover:shadow-md transition-all border border-[var(--border)]'>
              
              {/* Left Details */}
              <div className='flex items-start gap-5'>
                <div className="relative shrink-0">
                  <img className='w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl border border-[var(--border)] shadow-xs' src={item.image[0]} alt={item.name} />
                  <span className="absolute -top-2 -right-2 bg-[var(--accent)] text-white text-[10px] font-extrabold w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
                    {item.quantity}
                  </span>
                </div>
                
                <div className='space-y-1.5'>
                  <h3 className='text-base sm:text-lg font-bold text-[var(--ink)] font-heading leading-tight'>{item.name}</h3>
                  <div className='flex flex-wrap items-center gap-2.5 text-xs text-[var(--ink-soft)]'>
                    <span className='font-bold text-[var(--accent)] text-base'>{currency}{formatPrice(item.price)}</span>
                    <span className='w-1 h-1 bg-[var(--border-strong)] rounded-full'></span>
                    <span className="bg-[var(--surface-elevated)] px-2 py-0.5 rounded border border-[var(--border)] text-[var(--ink)] font-semibold">Size: {item.size}</span>
                    <span className='w-1 h-1 bg-[var(--border-strong)] rounded-full'></span>
                    <span className="bg-[var(--surface-elevated)] px-2 py-0.5 rounded border border-[var(--border)] text-[var(--ink-soft)] uppercase text-[10px] font-bold">{item.paymentMethod}</span>
                  </div>
                  <p className='text-xs flex items-center gap-1.5 text-[var(--ink-muted)] pt-0.5'>
                    <Clock size={13} />
                    Ordered on: <span className='text-[var(--ink)] font-semibold'>{new Date(Number(item.date)).toLocaleDateString()}</span>
                  </p>
                </div>
              </div>

              {/* Right Action Controls */}
              <div className='flex flex-col sm:flex-row md:flex-col lg:flex-row items-start sm:items-center md:items-end justify-between gap-3 border-t md:border-t-0 pt-4 md:pt-0 border-[var(--border)]'>
                
                {/* Status Badge */}
                <div className='flex items-center gap-2 px-3.5 py-1.5 bg-[var(--surface-elevated)] rounded-full border border-[var(--border)]'>
                  <span className={`w-2.5 h-2.5 rounded-full ${item.status === 'Delivered' ? 'bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)]' : 'bg-amber-500 animate-pulse'}`} />
                  <p className='text-xs font-bold text-[var(--ink)]'>{item.status}</p>
                </div>

                {/* CTA Action Buttons */}
                <div className='flex items-center gap-2 w-full sm:w-auto'>
                  {/* CRO Lever: Buy Again */}
                  <button
                    onClick={() => handleBuyAgain(item._id, item.size)}
                    className='btn-accent py-2 px-4 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs hover:scale-105 transition-transform'
                  >
                    <RotateCcw size={14} /> Buy Again
                  </button>

                  {/* Track Order */}
                  <button
                    onClick={() => { setSelectedOrder(item); setShowTracking(true) }}
                    className='btn-secondary py-2 px-4 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5'
                  >
                    <Truck size={14} /> Track
                  </button>

                  {/* Print Invoice */}
                  <button
                    onClick={() => { setSelectedOrder(item); setShowInvoice(true) }}
                    className='p-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--ink-soft)] hover:text-[var(--ink)] hover:border-[var(--ink-muted)] transition-colors'
                    title="View Invoice"
                  >
                    <Printer size={15} />
                  </button>
                </div>

              </div>
            </div>
          ))
        )}
      </div>

      {/* Complete Your Wardrobe - Upsell Recommendation Strip */}
      {products.length > 0 && (
        <div className='mt-20 max-w-6xl mx-auto px-4 border-t border-[var(--border)] pt-12'>
          <div className='flex items-center justify-between mb-8'>
            <div>
              <p className='text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)] mb-1'>Recommended for you</p>
              <h2 className='text-2xl font-extrabold text-[var(--ink)] tracking-tight'>
                Complete Your <span className='font-editorial italic font-normal text-[var(--accent)] text-3xl'>Wardrobe</span>
              </h2>
            </div>
            <button 
              onClick={() => navigate('/collection')}
              className='text-xs font-bold text-[var(--ink)] hover:underline flex items-center gap-1 uppercase tracking-wider'
            >
              Shop All <ArrowRight size={14} />
            </button>
          </div>

          <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
            {products.slice(0, 4).map((item, index) => (
              <ProductItem 
                key={index}
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
                sizes={item.sizes}
                stock={item.stock}
              />
            ))}
          </div>
        </div>
      )}

      {/* Order Tracking Modal */}
      {showTracking && selectedOrder && (
        <div className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-fade-in'>
          <div className='bg-[var(--surface)] border border-[var(--border)] rounded-2xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl animate-fade-in-up'>
            <button onClick={() => setShowTracking(false)} className='absolute top-4 right-4 text-[var(--ink-muted)] hover:text-[var(--ink)] p-2 rounded-full hover:bg-[var(--surface-elevated)] transition-colors'>
              <X size={20} />
            </button>

            <div className="text-center mb-6">
              <h3 className='text-xl font-bold text-[var(--ink)] flex items-center justify-center gap-2.5'>
                <Truck className='text-[var(--accent)]' size={24} />
                Shipment Tracking
              </h3>
              <p className="text-[var(--ink-soft)] text-xs mt-1">Live tracking status for order #{selectedOrder.orderId}</p>
            </div>

            <div className='flex items-center gap-4 mb-6 p-3.5 bg-[var(--surface-elevated)] rounded-xl border border-[var(--border)]'>
              <img className='w-14 h-14 object-cover rounded-lg shadow-xs' src={selectedOrder.image[0]} alt='' />
              <div>
                <p className='font-bold text-[var(--ink)] text-sm'>{selectedOrder.name}</p>
                <p className='text-xs text-[var(--ink-soft)] font-medium'>Qty: {selectedOrder.quantity} <span className="mx-1 text-[var(--ink-muted)]">|</span> Size: {selectedOrder.size}</p>
              </div>
            </div>

            <div className='relative pl-4 mb-6'>
              <div className="absolute left-6 top-2 bottom-4 w-0.5 bg-[var(--border)]"></div>

              <div className='space-y-5'>
                {[
                  { status: 'Order Placed', icon: Package, date: new Date(Number(selectedOrder.date)).toLocaleDateString() },
                  { status: 'Packing', icon: Package },
                  { status: 'Shipped', icon: Truck },
                  { status: 'Out for delivery', icon: MapPin },
                  { status: 'Delivered', icon: CheckCircle }
                ].map((step, index) => {
                  const currentStepIndex = ['Order Placed', 'Packing', 'Shipped', 'Out for delivery', 'Delivered'].indexOf(selectedOrder.status);
                  const isCompleted = index <= currentStepIndex;
                  const isCurrent = index === currentStepIndex;

                  return (
                    <div key={index} className='flex items-center gap-4 relative z-10'>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${isCompleted
                          ? 'bg-[var(--ink)] border-[var(--ink)] text-white shadow-xs'
                          : 'bg-[var(--surface)] border-[var(--border)] text-[var(--ink-muted)]'
                        } ${isCurrent ? 'scale-110 ring-4 ring-[var(--accent-soft)]' : ''}`}>
                        <step.icon size={16} />
                      </div>
                      <div className='flex-1'>
                        <p className={`font-bold text-xs sm:text-sm transition-colors duration-300 ${isCompleted ? 'text-[var(--ink)]' : 'text-[var(--ink-muted)]'}`}>
                          {step.status}
                        </p>
                        {step.date && <p className='text-[10px] text-[var(--ink-muted)] font-medium'>{step.date}</p>}
                        {isCurrent && <p className="text-[10px] text-[var(--accent)] font-bold mt-0.5 animate-pulse">In Transit...</p>}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <button onClick={() => setShowTracking(false)} className="w-full btn-primary py-3 text-xs font-bold uppercase tracking-wider rounded-xl">
              Close Tracker
            </button>
          </div>
        </div>
      )}

      {/* Invoice Modal */}
      {showInvoice && selectedOrder && (
        <div className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-fade-in'>
          <div className='bg-white text-slate-900 rounded-2xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl animate-fade-in-up border border-slate-200'>
            <button onClick={() => setShowInvoice(false)} className='absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100'>
              <X size={20} />
            </button>

            <div className='border-b border-slate-200 pb-4 mb-4 flex justify-between items-start'>
              <div>
                <h3 className='text-xl font-extrabold tracking-tight uppercase'>SHOP<span className='text-amber-600'>LEX</span></h3>
                <p className='text-[10px] text-slate-500 uppercase tracking-widest font-bold'>Tax Invoice / Purchase Receipt</p>
              </div>
              <div className='text-right text-xs text-slate-500'>
                <p className='font-bold text-slate-800'>Invoice #{selectedOrder.orderId}</p>
                <p>{new Date(Number(selectedOrder.date)).toLocaleDateString()}</p>
              </div>
            </div>

            <div className='space-y-3 text-xs mb-6'>
              <div className='flex justify-between py-2 border-b border-slate-100 font-bold text-slate-700'>
                <span>Item Description</span>
                <span>Amount</span>
              </div>
              <div className='flex justify-between items-center py-1'>
                <span>{selectedOrder.name} (Qty: {selectedOrder.quantity}, Size: {selectedOrder.size})</span>
                <span className='font-mono font-bold'>{currency}{formatPrice(selectedOrder.price)}</span>
              </div>
              <div className='flex justify-between items-center py-1 text-slate-500'>
                <span>Shipping Fee</span>
                <span>FREE</span>
              </div>
              <div className='flex justify-between items-center pt-3 border-t border-slate-200 text-sm font-extrabold text-slate-900'>
                <span>Total Paid ({selectedOrder.paymentMethod})</span>
                <span className='text-amber-700 font-mono'>{currency}{formatPrice(selectedOrder.price)}</span>
              </div>
            </div>

            <div className='flex gap-3'>
              <button 
                onClick={() => window.print()}
                className='flex-1 bg-slate-900 text-white py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-slate-800'
              >
                <Printer size={14} /> Print Receipt
              </button>
              <button 
                onClick={() => setShowInvoice(false)}
                className='px-5 bg-slate-100 text-slate-700 py-2.5 rounded-xl text-xs font-bold uppercase'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default Orders
