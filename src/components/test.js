{cartItems.map((item,index)=>(
                <div className={style.cart__item}>
                    <div className={style.cart__item__wrap}>
                        <div style={{display:"flex",justifyContent:"space-between"}}>
                            <div className={style.item__details}>
                                <h2>Man</h2>
                                <p>$5656</p>
                            </div>
                            <img className={style.cart__img} src={test} alt="" />  
                        </div>
                        <button>iuioh</button>
                    </div>
                </div>   
                ))}