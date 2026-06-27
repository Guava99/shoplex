import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const delivery_fee = 50;
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'

    console.log('ShopContext initialized with backend URL:', backendUrl);
    console.log('Environment variables:', import.meta.env);
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [isCartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [wishlist, setWishlist] = useState([]);
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState(() => {
        const t = localStorage.getItem('token');
        return (t && t !== 'null' && t !== 'undefined') ? t : '';
    })
    const [currency, setCurrency] = useState('₹');
    const [currencyCode, setCurrencyCode] = useState('INR');
    const [rates, setRates] = useState({ INR: 1 });
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');
        setToken('');
        setCartItems({});
        setWishlist([]);
    };

    const currencySymbols = {
        INR: '₹',
        USD: '$',
        EUR: '€',
        GBP: '£',
        JPY: '¥',
        CAD: 'C$',
        AUD: 'A$',
    };

    const fetchRates = async (base = 'INR') => {
        try {
            const cachedRates = localStorage.getItem('currencyRates');
            const cachedTime = localStorage.getItem('currencyRatesTime');

           
            const EXPIRY = 24 * 60 * 60 * 1000;

            if (cachedRates && cachedTime && (Date.now() - cachedTime < EXPIRY)) {
                setRates(JSON.parse(cachedRates));
                return;
            }

            const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${base}`);
            setRates(response.data.rates);
            localStorage.setItem('currencyRates', JSON.stringify(response.data.rates));
            localStorage.setItem('currencyRatesTime', Date.now());
        } catch (error) {
            console.error('Error fetching exchange rates:', error);
        }
    };

    const detectCurrency = async () => {
        try {
            const cachedCurrency = localStorage.getItem('userCurrency');

            if (cachedCurrency) {
                const userCurrency = cachedCurrency;
                if (userCurrency && currencySymbols[userCurrency]) {
                    setCurrencyCode(userCurrency);
                    setCurrency(currencySymbols[userCurrency]);
                    fetchRates('INR');
                    return;
                }
            }

            const response = await axios.get('https://ipapi.co/json/');
            const userCurrency = response.data.currency;
            if (userCurrency && currencySymbols[userCurrency]) {
                setCurrencyCode(userCurrency);
                setCurrency(currencySymbols[userCurrency]);
                localStorage.setItem('userCurrency', userCurrency);
                fetchRates('INR');
            }
        } catch (error) {
            console.error('Error detecting geo-location:', error);
        }
    };

    const formatPrice = (price) => {
        const rate = rates[currencyCode] || 1;
        return (price * rate).toFixed(2);
    };


    const addToCart = async (itemId, size) => {
        console.log('Adding to cart:', { itemId, size, token: !!token });

        if (!size) {
            toast.error('Please select a size first');
            return;
        }

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            }
            else {
                cartData[itemId][size] = 1;
            }
        }
        else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        setCartItems(cartData);

        if (token) {
            toast.success('Added to cart successfully.');

            try {
                console.log('Sending to backend:', { itemId, size });
                const response = await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { Authorization: `Bearer ${token}` } })
                console.log('Backend response:', response.data);
                if (!response.data.success) {
                    if (response.data.message === 'Invalid token' || response.data.message === 'Not Authorized Login Again') {
                        logout();
                        toast.error('Session expired. Please login again.');
                        return;
                    }
                    toast.error(response.data.message || 'Failed to sync with server');
                    getUserCart(token);
                }
            } catch (error) {
                console.log('Cart API error:', error)
                toast.error('Failed to sync with server, but item added locally!')
                getUserCart(token);
            }
        } else {
            console.log('No token, cart saved locally only');
            toast.success('Added to cart successfully.');
        }

        setCartOpen(true);
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {

                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId, size, quantity) => {

        let cartData = structuredClone(cartItems);

        cartData[itemId][size] = quantity;

        setCartItems(cartData)

        if (token) {
            try {

                await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { Authorization: `Bearer ${token}` } })

            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }

    }

    const updateCartItemSize = async (itemId, oldSize, newSize) => {
        let cartData = structuredClone(cartItems);

       
        if (!cartData[itemId] || !cartData[itemId][oldSize]) return;
        if (oldSize === newSize) return;

        const quantityToMove = cartData[itemId][oldSize];

      
        delete cartData[itemId][oldSize];
        if (Object.keys(cartData[itemId]).length === 0) {
            delete cartData[itemId];
        }

      
        if (!cartData[itemId]) cartData[itemId] = {};

        if (cartData[itemId][newSize]) {
            cartData[itemId][newSize] += quantityToMove;
        } else {
            cartData[itemId][newSize] = quantityToMove;
        }

        setCartItems(cartData);

        if (token) {
            try {
                
                await axios.post(backendUrl + '/api/cart/update', { itemId, size: oldSize, quantity: 0 }, { headers: { Authorization: `Bearer ${token}` } });

             
                const newTotalQuantity = cartData[itemId][newSize];
                await axios.post(backendUrl + '/api/cart/update', { itemId, size: newSize, quantity: newTotalQuantity }, { headers: { Authorization: `Bearer ${token}` } });

                toast.success('Size updated!');
            } catch (error) {
                console.log(error);
                toast.error('Failed to update size');
               
                getUserCart(token);
            }
        } else {
            toast.success('Size updated!');
        }
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        const productMap = new Map(products.map(product => [product._id, product]));

        for (const itemId in cartItems) {
            let itemInfo = productMap.get(itemId);
            if (!itemInfo) continue;

            for (const size in cartItems[itemId]) {
                try {
                    if (cartItems[itemId][size] > 0) {
                        totalAmount += itemInfo.price * cartItems[itemId][size];
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        }
        return totalAmount;
    }

    const getProductsData = async () => {
        try {

            const response = await axios.get(backendUrl + '/api/product/list')
            if (response.data.success) {
                setProducts(response.data.products.reverse())
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getUserCart = async (token) => {
        try {
            const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { Authorization: `Bearer ${token}` } })
            if (response.data.success) {
                setCartItems(response.data.cartData)
            } else if (response.data.message === 'Invalid token' || response.data.message === 'Not Authorized Login Again') {
                logout();
            }
        } catch (error) {
            console.log(error)
        }
    }

    const toggleWishlist = async (productId) => {
        console.log('toggleWishlist called with ID:', productId);
        if (!token) {
            toast.error('Please login to use wishlist')
            return
        }

        if (!productId) {
            console.error('toggleWishlist: productId is undefined or null');
            return;
        }

        try {
            const isWishlisted = wishlist && wishlist.find(item => {
                if (!item) return false;
                const itemId = item._id || item.id;
                const match = itemId && itemId.toString() === productId.toString();
                console.log(`Checking wishlist item ${itemId} against ${productId}: Match=${match}`);
                return match;
            })
            const endpoint = isWishlisted ? '/api/wishlist/remove' : '/api/wishlist/add'

          
            const message = isWishlisted ? 'Removed from wishlist' : 'Added to wishlist';
            toast.success(message);

            console.log('Toggling wishlist:', { productId, isWishlisted: !!isWishlisted, endpoint, wishlistLength: wishlist?.length });

            const cleanProductId = productId.toString().trim();
            const response = await axios.post(backendUrl + endpoint, { productId: cleanProductId }, { headers: { Authorization: `Bearer ${token}` } })

            console.log('Wishlist Toggle Response:', response.data);

            if (response.data.success) {
               
                await getWishlist(token)
            } else {
                if (response.data.message === 'Invalid token' || response.data.message === 'Not Authorized Login Again') {
                    logout();
                    toast.error('Session expired. Please login again.');
                    return;
                }
                toast.error(response.data.message)
                
                await getWishlist(token)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getWishlist = async (token) => {
        try {
            const response = await axios.post(backendUrl + '/api/wishlist/get', {}, { headers: { Authorization: `Bearer ${token}` } })
            if (response.data.success) {
                setWishlist(response.data.wishlist)
            } else if (response.data.message === 'Invalid token' || response.data.message === 'Not Authorized Login Again') {
                logout();
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProductsData()
        fetchRates()
        detectCurrency()
    }, [])

    useEffect(() => {
        const storedToken = localStorage.getItem('token')
        if (storedToken && storedToken !== 'null' && storedToken !== 'undefined') {
            if (!token) {
                setToken(storedToken)
            }
        } else if (token) {

            localStorage.setItem('token', token)
        }
    }, [])

    useEffect(() => {
        if (token) {
            getUserCart(token)
            getWishlist(token)
        }
    }, [token])

    const value = {
        products, currency, currencyCode, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        isCartOpen, setCartOpen,
        cartItems, addToCart, setCartItems,
        getCartCount, updateQuantity, updateCartItemSize,
        getCartAmount, navigate, backendUrl,
        setToken, token, logout,
        wishlist, toggleWishlist, getWishlist,
        rates, setCurrencyCode, setCurrency, formatPrice, currencySymbols
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )

}

export default ShopContextProvider;