import React,{useEffect,useState,useContext} from 'react'
import style from '../styles/featured.module.css'
import dog from '../assets/dog.png'
import {CartContext} from '../contextApi/cartContextApi.js'
import Item from 'antd/lib/list/Item';
import Products from './products';




function Featured() {

    const [data,setData] = useState();

    const {alsoViewed} = useContext(CartContext);

    const viewed = alsoViewed.slice(4,7).map((item,index)=>(
        <div className={style.about__right__img}>
            <img src={item.image.src} alt={Products.name} />
        </div>
                        
    ))


    useEffect(()=>{
        getFeaturedProduct();
      
    },[]);

    async function getFeaturedProduct(){
        const getProduct = await fetch('https://my-json-server.typicode.com/makinde1034/bejamas--server/products');
        const res = await getProduct.json();
        const fr = res.map(i=>{
            if(i.featured === true){
               setData(i);
            //    console.log(i)
            }
        });

       
        
    }



    return (
        <div>
            <div className={style.featured}>
                <nav className={style.featured__nav}>
                    <h2>{data?.name}</h2>
                    <button>ADD TO CART</button>
                </nav>
                <div className={style.featured__hero}>
                    <div className={style.featured__hero__img}>
                        <img src={data?.image.src} alt="featured product " />
                    </div>
                    {/* featured day photo absolute */}
                    <div className={style.featured__photo}>
                        <p>PHOTO OF THE DAY</p>
                    </div>
                </div>
            </div>
            <div className={style.about}>
                <div className={style.about__left}>
                    <h2>About the {data?.name}</h2>
                    <h3>{data?.category}</h3>
                    <p>{data?.details.description}</p>
                </div>
                <div className={style.about__right}>
                    <h2>People also buy</h2>
                    <div className={style.about__right__flex}>
                        {viewed}
                    </div>
                    <h2 className={style.about__detail}>Details</h2>
                    <p className={style.size}>Size: {data?.details.dimmentions.width} * {data?.details.dimmentions.height} pixel</p>
                    <p className={style.size}>Size: {data?.details.size}</p>
                </div>
            </div>
        </div>
    )
}

export default Featured
