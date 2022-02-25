import React from 'react';

const CartItem = ({id, description, price, imgSource, onDelete}) => {
    return (
        <div className='cart_item'>
            <img width={133} height={112} src={imgSource} alt=""/>
            <div className='cart_item-description'>
                <p>{description}</p>
                <span>{price}</span>
            </div>
            <img className={'cart_item-btn'} height={32} width={32} src="/img/delete.svg" onClick={()=>onDelete('delete', id)}
                 alt=""/>
        </div>
    );
};

export default CartItem;