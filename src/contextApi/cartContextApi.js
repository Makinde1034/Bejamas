import React,{createContext,useState} from 'react'

export const CartContext = createContext();

function CartContextApi(props) {

    const [cart,setCart] = useState(false);
    const [cartItems,setCartItems] = useState([]);
    const [loading,setLoading] = useState(true);
    const [toast,setToast] = useState(false);
    const [toastMsg,setToastMsg] = useState('')
    const [alsoViewed,setAlsoViewed] = useState([])

    

    const data = {cart,setCart,cartItems,setCartItems,setLoading,loading,toast,setToast,toastMsg,setToastMsg,alsoViewed,setAlsoViewed}
    return (
        <CartContext.Provider value={data}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartContextApi
