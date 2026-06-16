import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const addToWishlist = async (req, res) => {
    try {
        const { userId, productId } = req.body
        console.log('Adding to wishlist - User:', userId, 'Product:', productId)

        const user = await prisma.user.findUnique({ where: { id: userId } })
        if (!user) return res.json({ success: false, message: "User not found" })

        const isAlreadyIn = user.wishlist.some(id => id.toString() === productId.toString())

        if (!isAlreadyIn) {
            await prisma.user.update({
                where: { id: userId },
                data: {
                    wishlist: {
                        push: productId.toString()
                    }
                }
            })
            console.log('Product added to wishlist successfully')
        } else {
            console.log('Product already in wishlist')
        }

        res.json({ success: true, message: "Added to wishlist" })

    } catch (error) {
        console.error('Wishlist Add Error:', error)
        res.json({ success: false, message: error.message })
    }
}


const removeFromWishlist = async (req, res) => {
    try {
        const { userId, productId } = req.body

        if (!productId) {
            return res.json({ success: false, message: "Product ID is missing" })
        }

        console.log('Removing from wishlist - User:', userId, 'Product:', productId)

        const user = await prisma.user.findUnique({ where: { id: userId } })
        if (!user) return res.json({ success: false, message: "User not found" })

        const currentWishlist = user.wishlist || []
        const updatedWishlist = currentWishlist.filter(id => id.toString().trim() !== productId.toString().trim())

        console.log(`Wishlist update: Original size ${currentWishlist.length}, New size ${updatedWishlist.length}`)

        await prisma.user.update({
            where: { id: userId },
            data: {
                wishlist: updatedWishlist
            }
        })

        console.log('Product removed successfully')
        res.json({ success: true, message: "Removed from wishlist" })

    } catch (error) {
        console.error('Wishlist Remove Error:', error)
        res.json({ success: false, message: error.message })
    }
}

const getUserWishlist = async (req, res) => {
    try {
        const { userId } = req.body
        console.log('Fetching wishlist for User:', userId)

        const user = await prisma.user.findUnique({
            where: { id: userId }
        })

        if (!user) return res.json({ success: false, message: "User not found" })

        console.log('User wishlist IDs:', user.wishlist)

        if (!user.wishlist || user.wishlist.length === 0) {
            return res.json({ success: true, wishlist: [] })
        }

        const wishlistProducts = await prisma.product.findMany({
            where: {
                id: { in: user.wishlist }
            }
        })

        console.log(`Found ${wishlistProducts.length} products in wishlist`)

        const formattedWishlist = wishlistProducts.map(product => {
            const idString = product.id.toString();
            return {
                _id: idString,
                id: idString,
                name: product.name,
                description: product.description,
                price: product.price,
                image: product.image,
                category: product.category,
                subCategory: product.subCategory,
                sizes: product.sizes,
                bestseller: product.bestseller,
                date: product.date
            }
        });

        console.log('Returning formatted wishlist with IDs:', formattedWishlist.map(i => i._id))

        res.json({ success: true, wishlist: formattedWishlist })

    } catch (error) {
        console.error('Wishlist Get Error:', error)
        res.json({ success: false, message: error.message })
    }
}

export { addToWishlist, removeFromWishlist, getUserWishlist }
