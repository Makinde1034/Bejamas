import React,{useContext} from 'react'
import Nav from './nav'
import Featured from './featured'
import Product from './products.js'
import {CartContext} from '../contextApi/cartContextApi.js'



function Home() {

    const {loading} = useContext(CartContext);


    
  
    return (
        <div>
            <Nav />
            <Featured />
            <Product />
        </div>
    )
}

export default Home
