import prisma from "../config/prisma.js";
import validator from "validator";

const subscribe = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email || !validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email address" });
        }

        const existing = await prisma.subscriber.findUnique({ where: { email } });
        if (existing) {
            return res.json({ success: false, message: "You're already subscribed!" });
        }

        await prisma.subscriber.create({ data: { email } });

        res.json({ success: true, message: "Successfully subscribed! Check your email for the 20% discount code." });

    } catch (error) {
        console.log("Newsletter subscribe error:", error);
        res.json({ success: false, message: "Subscription failed. Please try again." });
    }
}

const listSubscribers = async (req, res) => {
    try {
        const subscribers = await prisma.subscriber.findMany({
            orderBy: { subscribedAt: 'desc' }
        });
        res.json({ success: true, subscribers });
    } catch (error) {
        console.log("List subscribers error:", error);
        res.json({ success: false, message: error.message });
    }
}

export { subscribe, listSubscribers };
