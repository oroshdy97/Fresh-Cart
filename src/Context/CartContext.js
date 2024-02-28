import axios from 'axios';
import React, { createContext, useState } from 'react'
export const cartContext = createContext()
function CartContextProvider({children}) {
    const [cartCounter, setCartCounter] = useState(0);
   async function addToCart(productId){
        return axios.post('https://route-ecommerce.onrender.com/api/v1/cart', {productId}, {
            headers: {
                token: localStorage.getItem('token')
            }
        }).then((data)=>data).catch((data)=>data)
    }
   async function getCart(){
        return axios.get('https://route-ecommerce.onrender.com/api/v1/cart',{
            headers: {
                token: localStorage.getItem('token')
            }
        }).then((data)=>data).catch((data)=>data)
    }
   async function deleteItem(productId){
        return axios.delete(`https://route-ecommerce.onrender.com/api/v1/cart/${productId}`,{
            headers: {
                token: localStorage.getItem('token')
            }
        }).then((data)=>data).catch((data)=>data)
    }
   async function updateQuantity(productId, count){
        return axios.put(`https://route-ecommerce.onrender.com/api/v1/cart/${productId}`, {count},{
            headers: {
                token: localStorage.getItem('token')
            }
        }).then((data)=>data).catch((data)=>data)
    }
   async function pay(cartId){
        return axios.post(`https://route-ecommerce.onrender.com/api/v1/orders/checkout-session/${cartId}`, {
            "shippingAddress":{
                "details": "details",
                "phone": "01010800921",
                "city": "Cairo"
                }
        },{
            headers: {
                token: localStorage.getItem('token')
            }
        }).then((data)=>data).catch((data)=>data)
    }

    return <>
    <cartContext.Provider value={{cartCounter, setCartCounter,addToCart,getCart, deleteItem, updateQuantity,pay}}>
    {children}
    </cartContext.Provider>
    </>
}

export default CartContextProvider
