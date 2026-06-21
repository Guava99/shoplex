import prisma from "../config/prisma.js"

const getAnalytics = async (req, res) => {
    try {
        const allOrders = await prisma.order.findMany()
        const products = await prisma.product.findMany()

        const paidOrders = allOrders.filter(o => o.payment === true)
        const totalRevenue = paidOrders.reduce((acc, order) => acc + order.amount, 0)
        const totalOrders = allOrders.length

        const sevenDaysAgo = new Date()
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

        const recentPaidOrders = paidOrders.filter(o => new Date(o.createdAt) >= sevenDaysAgo).sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))

        const revenueData = {}
        recentPaidOrders.forEach(order => {
            const date = order.createdAt.toISOString().split('T')[0]
            revenueData[date] = (revenueData[date] || 0) + order.amount
        })

        const formattedRevenueData = Object.keys(revenueData).map(date => ({
            date,
            revenue: revenueData[date]
        }))

        const productSales = {}
        allOrders.forEach(order => {
            let items = order.items
            if (typeof items === 'string') {
                try { items = JSON.parse(items) } catch (e) { }
            }
            if (Array.isArray(items)) {
                items.forEach(item => {
                    if (item.name && item.quantity) {
                        productSales[item.name] = (productSales[item.name] || 0) + item.quantity
                    }
                })
            }
        })

        const hotItems = Object.entries(productSales)
            .map(([name, sales]) => ({ name, sales }))
            .sort((a, b) => b.sales - a.sales)
            .slice(0, 5)

        const lowStockItems = products.filter(p => p.stock < 10)
        const statusDistribution = allOrders.reduce((acc, order) => {
            acc[order.status] = (acc[order.status] || 0) + 1
            return acc
        }, {})

        res.json({
            success: true,
            data: {
                summary: {
                    totalRevenue,
                    totalOrders,
                    activeProducts: products.length
                },
                revenueOverTime: formattedRevenueData,
                hotItems,
                lowStockItems,
                statusDistribution
            }
        })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { getAnalytics }
