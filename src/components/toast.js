import React,{useContext} from 'react'
import {CartContext} from '../contextApi/cartContextApi.js'
import style from '../styles/toast.module.css'

function Toast() {

    const {toast,toastMsg} = useContext(CartContext); 

    return (
        <div>
            <div className={toast ? `${style.toast}` : `${style.toast} ${style.toast__disabled}`}>
                <p>You added {toastMsg} to cart </p>
            </div>
        </div>
    )
}

export default Toast
