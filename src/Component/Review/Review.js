import React, { useEffect } from 'react';
import { useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';

const Review = () => {
    const [cart, setCart] = useState([])
    const [orderPlaced, setOrderPlaced] = useState(false)
    const history = useHistory()
    const handleProceedCheckout = () => {
        history.push('/Shipment')
    }

    const removeProduct = (product) =>{
        const newCart = cart.filter(pd=>pd.key !== product)
        setCart(newCart)
        removeFromDatabaseCart(product)

    }
    useEffect(() => {
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart)

        const cartProduct = productKeys.map(key=>{
            const product = fakeData.find(pd=> pd.key === key);
            product.quantity = saveCart[key];
            return product;
        })
        setCart(cartProduct)
    }, []);
    
    let thankyou;
    if(orderPlaced){
        thankyou = <img src={happyImage} alt=""/>
    }

    return (
        <div className='twin-container'>
            <div className='product-container' >
            { 
                cart.map(pd=> <ReviewItem product={pd} key={pd.key} removeProduct={removeProduct} ></ReviewItem>)
            }
            {
                thankyou
            }
            </div>
            <div className="cart-container" >
                <Cart cart={cart}>
                    <button onClick={handleProceedCheckout} className="main-button">Proceed checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;