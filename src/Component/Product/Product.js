import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Product = (props) => {
    const {img,name,seller,price,stock,key} = props.product

    return (
        <div className="product">
            <div>
            <img src={img} alt=""/>
            </div>
            <div>
            <h3 className="product-name"><Link to={'/product/'+key} >{name}</Link> </h3>
            <p>By:{seller} </p>
            <p>${price} </p>
            <p>Only {stock} left in stock - Order soon </p>
            { props.showAddToCart && <button className="main-button" onClick={()=> props.handleAddProduct(props.product)} >
                <FontAwesomeIcon icon={faShoppingCart} />  Add to cart</button>}
            </div>
        </div>
    );
};

export default Product;