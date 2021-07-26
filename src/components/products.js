import React,{useEffect,useState,useContext} from 'react'
import style from '../styles/products.module.css'
import arrowup from '../assets//arrowup.png'
import arrowdown from '../assets//arrowdown.png'

import Cart from '../components/cart.js'
import {CartContext} from '../contextApi/cartContextApi.js'
import  ReactPaginate from 'react-paginate'
import {categories} from './filterData'
import close from '../assets//close.png'
import filter from '../assets/filter.png'




function Products() {

    const [data,setData] = useState([]);
    const [constData,setConstData] = useState([])
    const [type,setType] = useState('price');
    const [pageNumber,setPageNumber] = useState(0);
    const [checkedValue,setCheckedValue] = useState();
    const [navFilter,setNavFilter] = useState(false)

    console.log(checkedValue)

    // contextApi to store items in cart
      const {cartItems,setCartItems,setCart,setLoading,loading,setToastMsg,setToast,setAlsoViewed} = useContext(CartContext); 

    // pagination
    const productssPerPage= 6
    const pagesVisited = productssPerPage * pageNumber

    // display products
    const displayProducts =  data.slice(pagesVisited,pagesVisited + productssPerPage).map((product,index)=>(
        <div className={style.test} key={index}>
            <div className={style.image}>
                <img src={product.image.src} alt={product.name} />
                <button onClick={()=>addProductToCart(product)}>ADD TO CART</button>
            </div>
            <p className={style.test__category}>{product.category}</p>
            <h2>{product.name}</h2>
            <p className={style.price}>${product.price}</p>
        </div>
    ))
    
    // preloader 
    const preloader = <div className={style.preloader}></div>

    // add product to cart

    function addProductToCart(product){
        // setCartItems(prevItems =>[...prevItems,{name:product.name}]);
        const itemExist = cartItems.find(i=>i.name===product.name)
        if(!itemExist){
            setCartItems(prevItems =>[...prevItems,{name:product.name,price:product.price,image:product.image.src,quantity:product.quantity}]);
            setCart(true);
            setToastMsg(product.name);
            setToast(true);
            setTimeout(() => {
                setToast(false);
            }, 7000);
        }
    }

   

    useEffect(()=>{
        getProducts();
    },[]);

    // fetch products from store
    async function getProducts(){
        const products = await fetch("https://my-json-server.typicode.com/makinde1034/bejamas--server/products")
        const res = await products.json();
        console.log(res);
        setData(res);
        setAlsoViewed(res)
        setConstData(res);
        if(res.length>0){
            setLoading(false);
        }
    }


    // sort products in descending order by price or alphabetically
    function descending(){
        if(type==='price'){
                const sorted = [...data].sort((a,b)=>{
                return b.price - a.price
            })
            setData(sorted);
           
        }else if(type==='alpha'){
            const sorted = [...data].sort((a,b)=>{
                return b.name - a.name
            });
            setData(sorted);
            console.log(sorted);
        }
        
    }

    // sort products in ascending order by price or alphabetically
    function ascending(){
        if (type === 'price') {
            const sorted = [...data].sort((a, b) => {
                return a.price - b.price
            })
            setData(sorted);

        } else if (type === 'alpha') {
            const sorted = [...data].sort((a, b) => {
                return b.name - a.name
            });
            setData(sorted);
            console.log(sorted);
        }
    }
    // pagination 
    const pageCount = Math.ceil(data.length/productssPerPage);

    const changePage = ({selected}) =>{
        setPageNumber(selected);
    }

    // filtering feature

    // function handleChange(category){
    //     setCheckedValue(category);
    //     if(checkedValue===category){
    //         const newFiltered = [...data].filter((i)=>{ return i.category===category})
    //         console.log(newFiltered)
    //         setData(newFiltered)
            
    //     }
    // }

    function handleChange(e){
        if(e.target.checked){
            setCheckedValue(e.target.value)
            const newFiltered = [...constData,data].filter((i)=>{ return i.category===e.target.value});
            setData(newFiltered)
            
        }
    }

    return (
        <div>
            <div className={style.nav}>
                <h2  className={style.cart}>Photography/ premium photosa</h2>
                <img className={style.filterIcon} onClick={()=>setNavFilter(true)} src={filter} alt="" />
                <div className={style.sort}>
                    <img style={{cursor:"Pointer"}} onClick={ascending} src={arrowup} alt="" />
                    <img style={{ cursor: "Pointer" }} onClick={descending} src={arrowdown} alt="" />
                    <p className={style.sortby}>Sort By</p>
                   <select onChange={(e)=>setType(e.target.value)} name="" id="">
                        <option value="price">Price</option>
                        {/* <option value="alpha">AlphabeticLLY</option> */}
                   </select>
                </div>
            </div>
            <div className={style.product}>
                <div className={navFilter ? `${style.product__filter}` : `${style.product__filter} ${style.product__filter__disabled}` }>
                    <nav className={style.product__filter__nav}>
                        <h2>Filter</h2>
                        <img onClick={()=>setNavFilter(false)} src={close} alt="" />
                    </nav>
                    <h2>Category</h2>
                    {categories.map((item,index)=>(
                        <div key={index} className={style.categories__checkbox}>
                            <input onChange={(e)=>handleChange(e)}  value={item.name} type="checkbox" />
                            <label htmlFor={item.name}>{item.name}</label>
                        </div>
                    ))}

                </div>
                <div>
                    <div className={style.product__area}>
                        
                        {loading ? preloader :displayProducts  }
                    
                    </div>
                    <div className={style.pagination}>
                         <ReactPaginate 
                            previousLabel={"<"}
                            nextLabel={">"}
                            pageCount={pageCount}
                            onPageChange={changePage}
                            containerClassName={style.paginationBtn}
                            previousClassName={style.previousBtn}
                            nextClassName={style.nextBtn}
                            activeClassName={style.active}

                        />
                    </div>
                </div>
               
            </div>
            <Cart />
        </div>
    );
}

export default Products;
