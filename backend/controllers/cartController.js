import prisma from "../config/prisma.js"


const addToCart = async (req, res) => {
    try {

        const { userId, itemId, size } = req.body


        if (!userId || !itemId || !size) {
            return res.json({ success: false, message: "Missing required fields" })
        }


        if (typeof itemId !== 'string' && typeof itemId !== 'number') {
            return res.json({ success: false, message: "Invalid item ID" })
        }


        if (typeof size !== 'string' || size.length > 10) {
            return res.json({ success: false, message: "Invalid size" })
        }

        let userData;
        try {
            userData = await prisma.user.findUnique({ where: { id: String(userId) } })
        } catch (error) {
            console.log('Database error:', error)
            return res.json({ success: false, message: "Please login again" })
        }

        if (!userData) {
            return res.json({ success: false, message: "User not found. Please login again." })
        }

        let cartData = userData.cartData || {};


        const sanitizedItemId = String(itemId).replace(/[^a-zA-Z0-9]/g, '');
        const sanitizedSize = String(size).replace(/[^a-zA-Z0-9]/g, '');

        if (cartData[sanitizedItemId]) {
            if (cartData[sanitizedItemId][sanitizedSize]) {
                cartData[sanitizedItemId][sanitizedSize] += 1
            }
            else {
                cartData[sanitizedItemId][sanitizedSize] = 1
            }
        } else {
            cartData[sanitizedItemId] = {}
            cartData[sanitizedItemId][sanitizedSize] = 1
        }

        await prisma.user.update({ where: { id: String(userId) }, data: { cartData } })

        res.json({ success: true, message: "Item added to your cart", timestamp: Date.now() })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Please login again" })
    }
}


const updateCart = async (req, res) => {
    try {

        const { userId, itemId, size, quantity } = req.body

        if (!userId || !itemId || !size || quantity === undefined) {
            return res.json({ success: false, message: "Missing required fields" })
        }

        if (typeof quantity !== 'number' || quantity < 0 || quantity > 100) {
            return res.json({ success: false, message: "Invalid quantity" })
        }

        let userData;
        try {
            userData = await prisma.user.findUnique({ where: { id: String(userId) } })
        } catch (error) {
            console.log('Database error:', error)
            return res.json({ success: false, message: "Please login again" })
        }

        if (!userData) {
            return res.json({ success: false, message: "User not found. Please login again." })
        }

        let cartData = userData.cartData || {};

        const sanitizedItemId = String(itemId).replace(/[^a-zA-Z0-9]/g, '');
        const sanitizedSize = String(size).replace(/[^a-zA-Z0-9]/g, '');

        if (!cartData[sanitizedItemId]) {
            cartData[sanitizedItemId] = {};
        }

        cartData[sanitizedItemId][sanitizedSize] = quantity

        await prisma.user.update({ where: { id: String(userId) }, data: { cartData } })
        res.json({ success: true, message: "Cart updated successfully", timestamp: Date.now() })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Please login again" })
    }
}

const getUserCart = async (req, res) => {

    try {

        const { userId } = req.body

        let userData;
        try {
            userData = await prisma.user.findUnique({ where: { id: String(userId) } })
        } catch (error) {
            console.log('Database error:', error)
            return res.json({ success: false, message: "Please login again" })
        }

        if (!userData) {
            return res.json({ success: false, message: "User not found. Please login again." })
        }

        let cartData = userData.cartData || {};

        res.json({ success: true, cartData, timestamp: Date.now() })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Please login again" })
    }

}

export { addToCart, updateCart, getUserCart }