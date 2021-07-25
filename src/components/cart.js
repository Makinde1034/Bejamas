import React,{useContext,useState} from 'react'
import style from '../styles/cart.module.css'
import close from '../assets/close.png'
import {CartContext} from '../contextApi/cartContextApi.js'



function Cart() {

    const {cart,setCart,cartItems,setCartItems} = useContext(CartContext);
    

    // increament
    function increament(index){
        const newCartItems = [...cartItems]
        newCartItems[index].quantity++
        // const newQuantity = newCartItems[index].quantity++
        // console.log(newQuantity)
        setCartItems(newCartItems);
    }

    // decreament
    function decreament(index){
        const newCartItems = [...cartItems]
        if(newCartItems[index].quantity>0){
            newCartItems[index].quantity--
            setCartItems(newCartItems);
           
        }
        
    }
    
    // function getTotal(){
    //     if(cartItems.length>0){
    //         const total = cartItems.reduce((total,item)=>{
    //             return total + item.price
    //         },0);
    //         console.log(total)
    //     }

        
    // }

  
    

  
    

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
                    <div className={style.quantity}>
                        <button onClick={()=>decreament(index)}>-</button>
                        <p>{item.quantity}</p>
                        <button onClick={()=>increament(index)}>+</button>
                    </div>
                    <button className={style.cart__item__wrap__button} onClick={()=>deleteProduct(item)} >DELETE</button>
                    
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

    // delete product from cart
    function deleteProduct(item){
        if(cartItems.length>0){
            const newProducts = [...cartItems].filter((i)=>{
            return item.name !== i.name
            });
            console.log(newProducts);
            setCartItems(newProducts); 
        }
        
  
      
    }

    // close cart
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
