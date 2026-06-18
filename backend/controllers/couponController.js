import prisma from "../config/prisma.js";

const validateCoupon = async (req, res) => {
    try {
        const { code, orderAmount } = req.body;

        if (!code) {
            return res.json({ success: false, message: "Please enter a coupon code" });
        }

        const coupon = await prisma.coupon.findUnique({ where: { code: code.toUpperCase() } });

        if (!coupon) {
            return res.json({ success: false, message: "Invalid coupon code" });
        }

        if (!coupon.isActive) {
            return res.json({ success: false, message: "This coupon is no longer active" });
        }

        if (coupon.expiresAt && new Date() > coupon.expiresAt) {
            return res.json({ success: false, message: "This coupon has expired" });
        }

        if (coupon.currentUses >= coupon.maxUses) {
            return res.json({ success: false, message: "This coupon has reached its usage limit" });
        }

        if (orderAmount && orderAmount < coupon.minOrderAmount) {
            return res.json({ success: false, message: `Minimum order amount is ₹${coupon.minOrderAmount}` });
        }

        res.json({
            success: true,
            coupon: {
                code: coupon.code,
                discountPercent: coupon.discountPercent,
                minOrderAmount: coupon.minOrderAmount
            }
        });

    } catch (error) {
        console.log("Validate coupon error:", error);
        res.json({ success: false, message: "Failed to validate coupon" });
    }
}

const createCoupon = async (req, res) => {
    try {
        const { code, discountPercent, minOrderAmount, maxUses, expiresAt } = req.body;

        if (!code || !discountPercent) {
            return res.json({ success: false, message: "Code and discount percentage are required" });
        }

        if (discountPercent < 1 || discountPercent > 90) {
            return res.json({ success: false, message: "Discount must be between 1% and 90%" });
        }

        const existing = await prisma.coupon.findUnique({ where: { code: code.toUpperCase() } });
        if (existing) {
            return res.json({ success: false, message: "Coupon code already exists" });
        }

        const coupon = await prisma.coupon.create({
            data: {
                code: code.toUpperCase(),
                discountPercent: Number(discountPercent),
                minOrderAmount: Number(minOrderAmount) || 0,
                maxUses: Number(maxUses) || 100,
                expiresAt: expiresAt ? new Date(expiresAt) : null
            }
        });

        res.json({ success: true, message: "Coupon created successfully", coupon });

    } catch (error) {
        console.log("Create coupon error:", error);
        res.json({ success: false, message: error.message });
    }
}

const listCoupons = async (req, res) => {
    try {
        const coupons = await prisma.coupon.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json({ success: true, coupons });
    } catch (error) {
        console.log("List coupons error:", error);
        res.json({ success: false, message: error.message });
    }
}

const deleteCoupon = async (req, res) => {
    try {
        const { id } = req.body;
        await prisma.coupon.delete({ where: { id: String(id) } });
        res.json({ success: true, message: "Coupon deleted successfully" });
    } catch (error) {
        console.log("Delete coupon error:", error);
        res.json({ success: false, message: error.message });
    }
}

export { validateCoupon, createCoupon, listCoupons, deleteCoupon };
