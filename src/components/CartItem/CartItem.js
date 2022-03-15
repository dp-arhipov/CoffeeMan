import React, {useContext} from 'react';
import './styles.scss'
import AmountBlock from "../AmountBlock";
import Context from "../../context";

const CartItem = ({id, amount, description, price, imgSource}) => {

    const {dispatch} = useContext(Context);


    const onDelete = (itemId=id) => {
        dispatch({type: "deleteItemFromCart", payload: {id: itemId}})
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
                    <AmountBlock id={id} amount={amount} />
                </div>
            </div>
            <img onClick={()=>onDelete(id)} className={'cart_item-delete-btn'} height={32} width={32} src="/img/delete.svg"
                 alt=""/>
        </div>
    );
};

export default CartItem;