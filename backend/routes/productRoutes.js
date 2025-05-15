const express = require('express');
const Cart = require('../models/Cart'); // Adjust the path if necessary
const router = express.Router();

// Add products to the user's cart
router.post('/cart/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { productId, quantity } = req.body;

        // Check if the user already has a cart
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            // If no cart, create an empty one for the user
            cart = new Cart({
                userId,
                items: [] // Empty cart
            });
        }

        // If cart exists and is empty, add the first item
        if (cart.items.length === 0) {
            cart.items.push({ productId, quantity });
        } else {
            // If cart is not empty, check if the product already exists
            const existingItem = cart.items.find(item => item.productId.toString() === productId);

            if (existingItem) {
                // If the item exists, update the quantity
                existingItem.quantity += quantity;
            } else {
                // If the item doesn't exist, add a new one
                cart.items.push({ productId, quantity });
            }
        }

        // Save the cart
        await cart.save();
        res.status(201).json({ message: 'Cart created/updated', cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Fetch cart for a user
router.get('/cart/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Remove an item from the cart
router.delete('/cart/:userId/:productId', async (req, res) => {
    try {
        const { userId, productId } = req.params;
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Remove the product from the cart
        cart.items = cart.items.filter(item => item.productId.toString() !== productId);
        await cart.save();

        res.status(200).json({ message: 'Product removed from cart', cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
