import React,{useContext} from 'react'
import style from '../styles/nav.module.css'
import Logo from '../assets/logo.png'
import Cart from '../assets/cart.png'
import {CartContext} from '../contextApi/cartContextApi.js'


function Nav() {

    const {cart,setCart,cartItems} = useContext(CartContext);

    return (
        <div>
            <header>
                <nav className={style.nav}>
                    <img className={style.logo} src={Logo} alt="logo" /> 
                    <div style={{display:"flex",alignItems:"center"}}>
                        <img className={style.cart} onClick={()=>setCart(!cart)}  src={Cart} alt="Cart" />
                        <div className={style.counter}>
                            <p>{cartItems.length}</p>
                        </div>
                    </div>
                   
                </nav>
            </header>
        </div>
    )
}

export default Nav
 