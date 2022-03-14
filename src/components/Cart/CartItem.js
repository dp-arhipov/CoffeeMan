import React from 'react';

const CartItem = ({id, amount, description, price, imgSource, ...props}) => {

    const onClickPlus = () => {
        props.onClickPlus('increaseItemAmount', id);
    }

    const onClickMinus = () => {
        props.onClickMinus('decreaseItemAmount', id);
    }

    return (
        <div className='cart_item'>
            <div className='cart_item-img'>
                <img width={50} src={imgSource} alt=""/>
            </div>

            <div className='cart_item-description'>
                <p>{description}</p>
                <span>{price} ₽</span>
            </div>
            <button onClick={onClickMinus}>
                -
            </button>
            <div className="amount">
                {amount}
            </div>

            <button onClick={onClickPlus}>
                +
            </button>


        </div>
    );
};

export default CartItem;