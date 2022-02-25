import React, {Fragment, useEffect, useState} from 'react';
import './styles.scss'
import CartItem from "./CartItem";

const Cart = ({onClose, onDelete, items}) => {


    const [summ, setSumm] = useState(0);

    useEffect(() => {
        setSumm(items.reduce((summ, item) => summ + parseFloat(item.price), 0))
    }, [items.length])

    return (
        <div className="overlay">
            <div className="drawer">
                <div className="cart">
                    <div className='cart_header'>
                        <h1 className='cart_title'>Корзина</h1>
                        <img onClick={onClose} className={'cart_close-btn'} height={32} width={32} src="/img/delete.svg"
                             alt=""/>
                    </div>
                    {(items.length != 0)
                        ?
                        <Fragment>
                            <div className="items-list">
                                {items.map((item) => {
                                    return (
                                        <CartItem key={item.id} id={item.id} description={item.description}
                                                  price={item.price} imgSource={item.imgSource} onDelete={onDelete}/>
                                    )
                                })}
                            </div>
                            <div className="cart_total">
                                <div className='cart_total-description'>
                                    <span>Итого:</span>
                                    <div className='cart_total-dots'></div>
                                    <span className='cart_total-price'>{summ}</span>
                                </div>
                                <button className='btn'>Оформить заказ
                                    <img className='btn-arrow-right' src="/img/arrow-right.svg" alt=""/>
                                </button>
                            </div>
                        </Fragment>
                        : <div className='cart_empty'>
                            <div className='cart_empty-wrapper'>
                                <img src="/img/empty-backet.svg" alt=""/>
                                <h1>Корзина пустая</h1>
                                <p>Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
                                <button className='btn' onClick={onClose}>
                                    <img className='btn-arrow-left' src="/img/arrow-left.svg" alt=""/>
                                    Вернуться назад
                                </button>
                            </div>
                        </div>
                    }
                </div>
            </div>

        </div>
    );
};

export default Cart;