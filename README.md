# 🛍️ Shoplex - Modern E-commerce Platform

A full-stack e-commerce application built with React, Node.js, and Prisma, featuring a modern UI, secure payments, and comprehensive admin panel.

## 🌟 Features

### 🛒 Customer Features
- **Modern Shopping Experience** - Clean, responsive design with smooth animations
- **Product Catalog** - Browse products with advanced filtering and search
- **Shopping Cart** - Add, remove, and manage items with real-time updates
- **Secure Checkout** - Multiple payment options (COD, Stripe, Razorpay)
- **Order Tracking** - View order history and track delivery status
- **User Profiles** - Manage personal information and addresses

### 👨‍💼 Admin Features
- **Dashboard** - Comprehensive overview of store metrics
- **Product Management** - Add, edit, and remove products with image uploads
- **Order Management** - View and update order statuses
- **User Management** - Monitor customer accounts and activities
- **Analytics** - Track sales, revenue, and customer insights

## 🚀 Live Demo

- **Frontend**: [https://shoplex-frontend.onrender.com](https://shoplex-frontend.onrender.com)
- **Admin Panel**: [https://shoplex-frontend.onrender.com/admin](https://shoplex-frontend.onrender.com/admin)
- **Backend API**: [https://shoplex.onrender.com](https://shoplex.onrender.com)

### Admin Credentials
- **Email**: `admin@example.com`
- **Password**: `admin123`

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **React Toastify** - Beautiful notifications

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Prisma** - Modern database toolkit
- **MongoDB** - NoSQL database
- **Cloudinary** - Image storage and optimization
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing

### Payment Integration
- **Stripe** - Credit card payments
- **Razorpay** - Indian payment gateway
- **COD** - Cash on delivery option

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB database
- Cloudinary account
- Stripe/Razorpay accounts (optional)

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Guava99/shoplex.git
   cd shoplex/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the backend directory:
   ```env
   JWT_SECRET=your_jwt_secret
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=admin123
   
   DATABASE_URL=your_mongodb_connection_string
   
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_SECRET_KEY=your_cloudinary_secret
   CLOUDINARY_NAME=your_cloudinary_name
   
   STRIPE_SECRET_KEY=your_stripe_secret_key
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_secret
   ```

4. **Database Setup**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start the server**
   ```bash
   npm start
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the frontend directory:
   ```env
   VITE_BACKEND_URL=http://localhost:4000
   VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## 🌐 Deployment

### Backend (Render)
1. Connect your GitHub repository to Render
2. Set environment variables in Render dashboard
3. Deploy with build command: `npm install`
4. Start command: `npm start`

### Frontend (Render)
1. Connect frontend folder to Render
2. Set environment variables:
   - `VITE_BACKEND_URL=https://your-backend-url.onrender.com`
3. Build command: `npm install && npm run build`
4. Start command: `npx serve -s dist -p 10000`

### SPA Routing Setup
Add redirect rule in Render dashboard:
- **Source**: `/*`
- **Destination**: `/index.html`
- **Action**: `Rewrite`

## 📁 Project Structure

```
shoplex/
├── backend/
│   ├── config/          # Database and service configurations
│   ├── controllers/     # Route handlers
│   ├── middleware/      # Authentication and validation
│   ├── routes/          # API routes
│   ├── prisma/          # Database schema and migrations
│   └── server.js        # Express server setup
├── frontend/
│   ├── src/
│   │   ├── admin/       # Admin panel components
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Main application pages
│   │   ├── context/     # React context providers
│   │   └── assets/      # Images and static files
│   └── public/          # Static assets
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/user/register` - User registration
- `POST /api/user/login` - User login
- `POST /api/user/admin` - Admin login

### Products
- `GET /api/product/list` - Get all products
- `POST /api/product/add` - Add new product (Admin)
- `POST /api/product/remove` - Remove product (Admin)

### Orders
- `POST /api/order/place` - Place new order
- `POST /api/order/stripe` - Stripe payment
- `POST /api/order/razorpay` - Razorpay payment
- `GET /api/order/list` - Get all orders (Admin)

### Cart
- `POST /api/cart/add` - Add item to cart
- `POST /api/cart/update` - Update cart item
- `GET /api/cart/get` - Get user cart

## 🎨 Features Showcase

### Modern UI/UX
- Responsive design for all devices
- Smooth animations and transitions
- Intuitive navigation and user flow
- Professional color scheme and typography

### Security Features
- JWT-based authentication
- Password hashing with bcrypt
- CORS protection
- Input validation and sanitization

### Performance Optimizations
- Image optimization with Cloudinary
- Lazy loading for better performance
- Efficient state management
- Optimized build process

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Vikash Kumar Yadav**
- GitHub: [@Guava99](https://github.com/Guava99)

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first approach
- Prisma for the excellent database toolkit
- All open-source contributors

---

⭐ **Star this repository if you found it helpful!**
