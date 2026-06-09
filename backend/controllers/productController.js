import { v2 as cloudinary } from "cloudinary"
import prisma from "../config/prisma.js"
import { sendPriceDropEmail } from "../config/email.js"

const addProduct = async (req, res) => {
    try {

        const { name, description, price, category, subCategory, sizes, bestseller } = req.body

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url
            })
        )

       
        let parsedSizes;
        try {
            parsedSizes = JSON.parse(sizes);
            if (!Array.isArray(parsedSizes) || parsedSizes.length === 0) {
                return res.json({ success: false, message: "Invalid sizes format" });
            }
       
            parsedSizes = parsedSizes.filter(size =>
                typeof size === 'string' &&
                size.length <= 10 &&
                /^[a-zA-Z0-9]+$/.test(size)
            );
        } catch (error) {
            return res.json({ success: false, message: "Invalid sizes JSON" });
        }

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            sizes: parsedSizes,
            image: imagesUrl,
            originalPrice: Number(price),
            stock: req.body.stock !== undefined ? Number(req.body.stock) : 50,
            date: Date.now().toString()
        }

        console.log(productData);

        await prisma.product.create({ data: productData })

        res.json({ success: true, message: "Product created successfully" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


const listProducts = async (req, res) => {
    try {

        const products = await prisma.product.findMany({
            where: { isActive: true }
        });

      
        const formattedProducts = products.map(product => ({
            _id: String(product.id),
            name: product.name,
            description: product.description,
            price: product.price,
            image: product.image,
            category: product.category,
            subCategory: product.subCategory,
            sizes: product.sizes,
            stock: product.stock,
            bestseller: product.bestseller,
            threeSixtyImages: product.threeSixtyImages,
            date: parseInt(product.date)
        }));

        res.json({ success: true, products: formattedProducts })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


const removeProduct = async (req, res) => {
    try {

        await prisma.product.delete({ where: { id: String(req.body.id) } })
        res.json({ success: true, message: "Product deleted successfully" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


const updateProduct = async (req, res) => {
    try {
        const { id, name, description, price, category, subCategory, sizes, bestseller, threeSixtyImages, stock } = req.body

      
        const oldProduct = await prisma.product.findUnique({ where: { id: String(id) } })

        if (!oldProduct) {
            return res.json({ success: false, message: "Product not found" })
        }

        const newPrice = Number(price)
        const oldPrice = oldProduct.price

        const updatedData = {
            name,
            description,
            category,
            price: newPrice,
            subCategory,
            bestseller: bestseller === "true" || bestseller === true ? true : false,
            sizes: typeof sizes === 'string' ? JSON.parse(sizes) : sizes,
            threeSixtyImages: typeof threeSixtyImages === 'string' ? JSON.parse(threeSixtyImages) : threeSixtyImages
        }

        if (stock !== undefined) {
            updatedData.stock = Number(stock);
        }

        await prisma.product.update({
            where: { id: String(id) },
            data: updatedData
        })

        if (newPrice < oldPrice) {
            console.log(`Price drop detected for ${name}: ${oldPrice} -> ${newPrice}`)

            
            const usersWithProduct = await prisma.user.findMany({
                where: {
                    wishlist: {
                        has: String(id)
                    }
                },
                select: {
                    email: true
                }
            })

            console.log(`Found ${usersWithProduct.length} users with this product in wishlist`)

         
            usersWithProduct.forEach(user => {
                sendPriceDropEmail(user.email, name, oldPrice, newPrice)
            })
        }

        res.json({ success: true, message: "Product updated successfully" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body
        const product = await prisma.product.findUnique({
            where: { id: String(productId) },
            include: {
                reviews: {
                    orderBy: {
                        createdAt: 'desc'
                    }
                }
            }
        })

        if (product) {
            const averageRating = product.reviews.length > 0
                ? product.reviews.reduce((acc, rev) => acc + rev.rating, 0) / product.reviews.length
                : 0;

            const formattedProduct = {
                _id: String(product.id),
                name: product.name,
                description: product.description,
                price: product.price,
                image: product.image,
                category: product.category,
                subCategory: product.subCategory,
                sizes: product.sizes,
                stock: product.stock,
                bestseller: product.bestseller,
                threeSixtyImages: product.threeSixtyImages,
                date: parseInt(product.date),
                reviews: product.reviews,
                averageRating: Number(averageRating.toFixed(1))
            };
            res.json({ success: true, product: formattedProduct })
        } else {
            res.json({ success: false, message: "Product not found" })
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


const addProductReview = async (req, res) => {
    try {
        const { productId, rating, comment, userId } = req.body

       
        const user = await prisma.user.findUnique({ where: { id: userId } })

        if (!user) {
            return res.json({ success: false, message: "User not found" })
        }

        const review = await prisma.review.create({
            data: {
                productId,
                userId,
                userName: user.name,
                rating: Number(rating),
                comment
            }
        })

        res.json({ success: true, message: "Review added successfully", review })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { listProducts, addProduct, removeProduct, singleProduct, updateProduct, addProductReview }