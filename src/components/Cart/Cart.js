import React, {Fragment, useEffect, useState} from 'react';
import './styles.scss'
import CartItem from "./CartItem";
import Button from "../Button";
import {Link} from "react-router-dom";
import TextInput from "../TextInput";
import useValidate from "../../customHooks/useValidate";
import Card from "../Card/Card";

const Cart = ({onClose, onDelete, items, handleOrder, handleCart, priceSumm}) => {

    const [phoneNumber, setPhoneNumber] = useState('');
    const [orderNumber, setOrderNumber] = useState('');
    const {validate, errors} = useValidate({
        phone: 'Введите корректный телефон'
    });

    useEffect(() => {
        if (phoneNumber) validate(phoneNumber, 'phone')
    }, [phoneNumber])

    const handleOrderButton = () => {
        if (validate(phoneNumber, 'phone')) {
            const orderNumb = handleOrder();
            setOrderNumber(orderNumb);
        }
    }

    const handlePhoneInput = (e) => {
        setPhoneNumber(e.target.value)
    }
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
                                        <CartItem
                                            key={item.id}
                                            id={item.id}
                                            amount={item.amount}
                                            description={item.description}
                                            price={item.price}
                                            imgSource={item.imgSource}
                                            onClickPlus={handleCart}
                                            onClickMinus={handleCart}
                                        />
                                    )
                                })}
                            </div>

                            <div className="cart_total">
                                <div className="cart_total-phone-input">
                                    <TextInput
                                        value={phoneNumber}
                                        onChange={handlePhoneInput}
                                        error={errors.phone}
                                        errorMessage={errors.phone}
                                        placeholder='Введите ваш номер телефона'/>
                                </div>

                                <div className='cart_total-description'>
                                    <span>Итого:</span>
                                    <div className='cart_total-dots'></div>
                                    <span className='cart_total-price'>{priceSumm}₽</span>
                                </div>
                                <Button onClick={handleOrderButton} type='arrow-right'>
                                    Оформить заказ
                                </Button>
                            </div>
                        </Fragment>
                        : (orderNumber)
                            ? <div className='cart_final'>
                                <div className='cart_final-wrapper'>
                                    <img src="/img/order.svg" alt=""/>
                                    <h1>Заказ #{orderNumber} оформлен </h1>
                                    <p>Совсем скоро с вами свяжется специалист для уточнения деталей</p>
                                    <Link to='/'>
                                        <Button onClick={onClose} type='arrow-left'>
                                            Вернуться к покупкам
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                            : <div className='cart_final'>
                                <div className='cart_final-wrapper'>
                                    <img src="/img/empty-cart.svg" alt=""/>
                                    <h1>Корзина пустая</h1>
                                    <p>Добавьте хотя бы одну упаковку кофе, чтобы сделать заказ.</p>
                                    <Link to='/'>
                                        <Button onClick={onClose} type='arrow-left'>
                                            Вернуться к покупкам
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                    }
                </div>
            </div>

        </div>
    );
};

export default Cart;