import validator from "validator";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import prisma from "../config/prisma.js";
import { v2 as cloudinary } from "cloudinary";

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({ success: false, message: "Email and password required" });
        }

        const user = await prisma.user.findUnique({ where: { email } });

        const dummyHash = '$2b$10$dummyhashtopreventtimingattacks';
        const userPassword = user ? user.password : dummyHash;
        const isMatch = await bcrypt.compare(password, userPassword);

        if (user && isMatch) {
            const token = createToken(user.id);
            return res.json({ success: true, token });
        } else {
            return res.json({ success: false, message: 'Invalid credentials' });
        }

    } catch (error) {
        console.log('Login error:', error);
        return res.json({ success: false, message: "Login failed" });
    }
}


const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({ success: false, message: "All fields required" });
        }

        const exists = await prisma.user.findUnique({ where: { email } });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid email" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Password too short" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });

        const token = createToken(user.id);
        return res.json({ success: true, token });

    } catch (error) {
        console.log('Registration error:', error);
        return res.json({ success: false, message: "Registration failed" });
    }
}


const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            return res.json({ success: true, token });
        } else {
            return res.json({ success: false, message: "Invalid credentials" });
        }

    } catch (error) {
        console.log('Admin login error:', error);
        return res.json({ success: false, message: "Admin login failed" });
    }
}


const getUserProfile = async (req, res) => {
    try {
        const { userId } = req.body;

        const user = await prisma.user.findUnique({
            where: { id: String(userId) },
            select: { id: true, name: true, email: true, image: true, createdAt: true }
        });

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        return res.json({ success: true, user });

    } catch (error) {
        console.log('Profile fetch error:', error);
        return res.json({ success: false, message: "Failed to fetch profile" });
    }
}


const updateUserProfile = async (req, res) => {
    try {
        const { userId, name } = req.body;
        const imageFile = req.file;

        if (!name || name.trim().length < 2) {
            return res.json({ success: false, message: "Name must be at least 2 characters" });
        }

        const dataToUpdate = { name: name.trim() };

        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });
            dataToUpdate.image = imageUpload.secure_url;
        }

        const updatedUser = await prisma.user.update({
            where: { id: String(userId) },
            data: dataToUpdate,
            select: { id: true, name: true, email: true, image: true }
        });

        return res.json({ success: true, user: updatedUser });

    } catch (error) {
        console.log('Profile update error:', error);
        return res.json({ success: false, message: "Failed to update profile" });
    }
}

export { loginUser, registerUser, adminLogin, getUserProfile, updateUserProfile };