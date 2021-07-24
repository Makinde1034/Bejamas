import React,{useContext} from 'react'
import Nav from './nav'
import Featured from './featured'
import Product from './products.js'
import {CartContext} from '../contextApi/cartContextApi.js'
import Toast from '../components/toast.js'



function Home() {

    const {loading} = useContext(CartContext);


    
   
    return (
        <div>
            <Nav />
            <Featured />
            <Product />
            <Toast />
        </div>
    ) 
    
}

export default Home
