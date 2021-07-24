import React from 'react'
import Nav from './nav'
import Featured from './featured'
import Product from './products.js'
import Toast from '../components/toast.js'



function Home() {

   


    
   
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
