import React, {Fragment, useEffect, useState} from 'react';
import './styles.scss'
import CartItem from "./CartItem";
import Button from "../Button";

const Cart = ({onClose, onDelete, items, handleOrder}) => {


    const [summ, setSumm] = useState(0);
    const [orderNumber, setOrderNumber] = useState(null);

    useEffect(() => {
        setSumm(items.reduce((summ, item) => summ + parseFloat(item.price), 0))
    }, [items.length])


    const handleOrderButton = () => {
        const orderNumb = handleOrder();
        setOrderNumber(orderNumb);

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
                                    <Button onClick={onClose} type='arrow-left'>
                                        Вернуться к покупкам
                                    </Button>
                                </div>
                            </div>
                            : <div className='cart_final'>
                                <div className='cart_final-wrapper'>
                                    <img src="/img/empty-cart.svg" alt=""/>
                                    <h1>Корзина пустая</h1>
                                    <p>Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
                                    <Button onClick={onClose} type='arrow-left'>
                                        Вернуться к покупкам
                                    </Button>
                                </div>
                            </div>
                    }
                </div>
            </div>

        </div>
    );
};

export default Cart;