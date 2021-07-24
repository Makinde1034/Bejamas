import React,{useContext} from 'react'
import style from '../styles/cart.module.css'
import close from '../assets/close.png'
import {CartContext} from '../contextApi/cartContextApi.js'
import test from '../assets/dog.png'


function Cart() {

    const {cart,setCart,cartItems,setCartItems} = useContext(CartContext);

    // Delete product from cart
    const cartProducts = () =>{
        if(cartItems.length>0){
           return cartItems.map((item,index)=>(
                <div key={index} className={style.cart__item__wrap}>
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                        <div className={style.item__details}>
                            <h2>{item.name}</h2>
                            <p>${item.price}</p>
                        </div>
                        <img className={style.cart__img} src={item.image} alt="" />  
                    </div>
                    <button >DELETE</button>
                </div> 
            ));
        }else{
            return (
                <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100%",width:"100%"}}>
                    <h2>Your cart is empty</h2>
                </div>
            )
        }
    }

    function closeCart(){
        setCart(false)
    }

    return (
        <div>
            <div className={cart ? `${style.cart} ${style.cart__active}` : `${style.cart}`}>
                <nav className={style.cart__nav}>
                    <img onClick={closeCart} src={close} alt="" />
                </nav>
                <div className={style.cart__item}>
                    {cartProducts()}
                   
                </div>
            </div>
        </div>
    );
}

export default Cart
