import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'
import { LucideTrendingUp, LucideShoppingBag, LucidePackage, LucideAlertTriangle, LucideRotateCw } from 'lucide-react'
import { toast } from 'react-toastify'

const Dashboard = ({ token }) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'

    const fetchAnalytics = async () => {
        try {
            setLoading(true)
            const response = await axios.get(backendUrl + '/api/admin/analytics', { headers: { Authorization: `Bearer ${token}` } })
            if (response.data.success) {
                setData(response.data.data)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("Failed to fetch analytics")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (token) {
            fetchAnalytics()
        }
    }, [token])

    if (loading) return <div className="flex justify-center items-center h-[60vh]"><LucideRotateCw className="animate-spin text-amber-600" size={40} /></div>
    if (!data) return <div>No data available</div>

    const COLORS = ['#d97706', '#ea580c', '#c2410c', '#9a3412'];

    return (
        <div className="p-6 space-y-8 animate-fade-in">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-amber-900">Business Overview</h1>
                    <p className="text-amber-700">Real-time performance metrics</p>
                </div>
                <button
                    onClick={fetchAnalytics}
                    className="flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-lg hover:bg-amber-200 transition-colors"
                >
                    <LucideRotateCw size={18} />
                    Refresh
                </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="modern-card p-6 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-amber-600">Total Revenue</p>
                        <h3 className="text-2xl font-bold text-amber-900">₹{data.summary.totalRevenue.toLocaleString()}</h3>
                    </div>
                    <div className="bg-green-100 p-3 rounded-full text-green-600"><LucideTrendingUp size={24} /></div>
                </div>
                <div className="modern-card p-6 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-amber-600">Total Orders</p>
                        <h3 className="text-2xl font-bold text-amber-900">{data.summary.totalOrders}</h3>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-full text-blue-600"><LucideShoppingBag size={24} /></div>
                </div>
                <div className="modern-card p-6 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-amber-600">Active Products</p>
                        <h3 className="text-2xl font-bold text-amber-900">{data.summary.activeProducts}</h3>
                    </div>
                    <div className="bg-orange-100 p-3 rounded-full text-orange-600"><LucidePackage size={24} /></div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Revenue Chart */}
                <div className="modern-card p-6">
                    <h3 className="text-lg font-bold text-amber-900 mb-6">Revenue Trend (Last 7 Days)</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data.revenueOverTime}>
                                <defs>
                                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#d97706" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#d97706" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#fee2e2" />
                                <XAxis dataKey="date" stroke="#92400e" fontSize={12} />
                                <YAxis stroke="#92400e" fontSize={12} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '8px' }}
                                    itemStyle={{ color: '#9a3412' }}
                                />
                                <Area type="monotone" dataKey="revenue" stroke="#d97706" fillOpacity={1} fill="url(#colorRev)" strokeWidth={3} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Hot Items */}
                <div className="modern-card p-6">
                    <h3 className="text-lg font-bold text-amber-900 mb-6">Top Selling Items</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data.hotItems} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#fee2e2" />
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" stroke="#92400e" fontSize={10} width={100} />
                                <Tooltip />
                                <Bar dataKey="sales" fill="#ea580c" radius={[0, 4, 4, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Inventory and Status Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Status Distribution */}
                <div className="modern-card p-6">
                    <h3 className="text-lg font-bold text-amber-900 mb-6">Order Status</h3>
                    <div className="h-[250px] w-full flex justify-around items-center">
                        <ResponsiveContainer width="50%" height="100%">
                            <PieChart>
                                <Pie
                                    data={Object.keys(data.statusDistribution).map(key => ({ name: key, value: data.statusDistribution[key] }))}
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {Object.keys(data.statusDistribution).map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="space-y-2">
                            {Object.keys(data.statusDistribution).map((status, index) => (
                                <div key={status} className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                                    <span className="text-sm font-medium text-amber-800 capitalize">{status}: {data.statusDistribution[status]}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Low Stock Alerts */}
                <div className="modern-card p-6 overflow-hidden">
                    <div className="flex items-center gap-2 mb-6">
                        <LucideAlertTriangle className="text-orange-600" />
                        <h3 className="text-lg font-bold text-amber-900">Inventory Health (Low Stock)</h3>
                    </div>
                    <div className="space-y-4 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                        {data.lowStockItems.length > 0 ? (
                            data.lowStockItems.map(item => (
                                <div key={item.id} className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-100">
                                    <span className="font-medium text-amber-900">{item.name}</span>
                                    <span className="px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold">{item.stock} left</span>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-6 text-amber-600 font-medium">✨ All items are well stocked!</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
