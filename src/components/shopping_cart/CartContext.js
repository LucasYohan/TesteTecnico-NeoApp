import { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
        const saved = localStorage.getItem("cart");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    function addToCart(item) {
        const exists = cartItems.find(cartItem => cartItem.id === item.id);
        if (exists) {
            alert("Este item já está no carrinho!");
            return;
        }
        setCartItems(prev => [...prev, item]);
    }

    function removeFromCart(id) {
        setCartItems(prev => prev.filter(item => item.id !== id));
    }

    function clearCart() {
        setCartItems([]);
        localStorage.removeItem("cart");
    }

    return (
        <CartContext.Provider value={{
            cartItems,
            setCartItems,
            addToCart,
            removeFromCart,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
