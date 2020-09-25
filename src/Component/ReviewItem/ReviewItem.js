import React from 'react';

const ReviewItem = (props) => {
    const {name,quantity,key,price} = props.product;
    const reviewStyle = { borderBottom:"3px solid green",padding:"5px",marginLeft:"200px"}
    return (
        <div style={reviewStyle}>
            <h3 className='product-name'> {name} </h3>
            <h3>Quantity: {quantity} </h3>
            <h3> ${price} </h3>
            <button onClick={()=>props.removeProduct(key)} className="main-button">Remove</button>
        </div>
    );
};

export default ReviewItem;