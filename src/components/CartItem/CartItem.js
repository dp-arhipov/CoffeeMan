import React from 'react';
import './styles.scss'
import AmountBlock from "../AmountBlock";

const CartItem = ({id, amount, description, price, imgSource, ...props}) => {

    const onClickPlus = () => {
        props.onClickPlus('increaseItemAmount', id);
    }

    const onClickMinus = () => {
        props.onClickMinus('decreaseItemAmount', id);
    }

    const onDelete = () => {
        props.onDelete('deleteItemFromCart', id);
    }

    return (
        <div className='cart_item'>
            <div className='cart_item-img'>
                <img width={50} src={imgSource} alt=""/>
            </div>
            <div className="cart_item-text">
                <div className='cart_item-description'>
                    <p>{description}</p>

                </div>
                <div className="cart_item-counters">
                    <span>{price} ₽</span>
                    <AmountBlock id={id} amount={amount} onClickMinus={onClickMinus} onClickPlus={onClickPlus}/>
                </div>
            </div>
            <img onClick={onDelete} className={'cart_item-delete-btn'} height={32} width={32} src="/img/delete.svg"
                 alt=""/>
        </div>
    );
};

export default CartItem;