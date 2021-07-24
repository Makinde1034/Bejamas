import React,{useEffect,useState,useContext} from 'react'
import style from '../styles/products.module.css'
import arrowup from '../assets//arrowup.png'
import arrowdown from '../assets//arrowdown.png'
import arrowleft from '../assets/arrowleft.png'
import arrowright from '../assets/arrowright.png'
import Cart from '../components/cart.js'
import {CartContext} from '../contextApi/cartContextApi.js'
import  ReactPaginate from 'react-paginate'





function Products() {

    const [data,setData] = useState([]);
    const [type,setType] = useState('price');
    const [pageNumber,setPageNumber] = useState(0);
    const [prevButton,setPrevButton] = useState(false);

    // contextApi to store items in cart
      const {cartItems,setCartItems,setCart,setLoading} = useContext(CartContext); 

    // pagination
    const productssPerPage= 6
    const pagesVisited = productssPerPage * pageNumber

    const displayProducts = data.slice(pagesVisited,pagesVisited + productssPerPage).map((product,index)=>(
        <div className={style.test} key={index}>
            <div className={style.image}>
                <img src={product.image.src} alt="" />
                <button onClick={()=>addProductToCart(product)}>ADD TO CART</button>
            </div>
            <p className={product.category}>{product.category}</p>
            <h2>{product.name}</h2>
            <p className={style.price}>${product.price}</p>
        </div>
    ))

    // add product to cart

    function addProductToCart(product){
        // setCartItems(prevItems =>[...prevItems,{name:product.name}]);
        const itemExist = cartItems.find(i=>i.name===product.name)
        if(!itemExist){
            setCartItems(prevItems =>[...prevItems,{name:product.name,price:product.price,image:product.image.src}]);
            setCart(true)
        }
    }

    // move to next page
    function nextPage(){
        setPageNumber(pageNumber + 1);
    }

    // move to previous page
    function prevPage(){
        setPageNumber(pageNumber - 1);
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
        setLoading(false)
    }

    function sorttest(type){
        // const sorted = [...data].sort((a,b)=>{
        //     return b.price - a.price
        // })
       

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

    const pageCount = Math.ceil(data.length/productssPerPage);

    const changePage = ({selected}) =>{
        setPageNumber(selected);
    }

    return (
        <div>
            <div className={style.nav}>
                <h2 className={style.cart}>Photography/ premium photosa</h2>
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
                <div className={style.product__filter}></div>
                <div>
                    <div className={style.product__area}>
                        {displayProducts}
                    
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