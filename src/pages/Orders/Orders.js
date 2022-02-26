import React, {Fragment, useCallback, useEffect, useState} from 'react';
import './styles.scss'

import Header from "../../components/Header";
import ContentWrapper from "../../components/Container";
import ContentHeader from "../../components/Container/ContentHeader";
import CardList from "../../components/CardList";
import Wrapper from "../../components/Wrapper";
import EmptyBanner from "../../components/EmptyBanner";
const Orders = ({goodsWithMarkers, handleFavourite, handleCart, handleOrder}) => {

    const [goodsInOrders, setGoodsInOrders] = useState([]);

    useEffect(() => {
        setGoodsInOrders(goodsWithMarkers.filter(item => item.inHistory == true))
        console.log(setGoodsInOrders)
    }, [goodsWithMarkers])

    return (
        <Wrapper>
            <Header goodsWithMarkers={goodsWithMarkers} handleCart={handleCart} handleOrder={handleOrder}/>
            <ContentWrapper>
                {(goodsInOrders.length != 0)
                    ?
                    <Fragment>
                        <ContentHeader>
                            <h1>Мои заказы</h1>
                        </ContentHeader>
                        <CardList items={goodsInOrders} handleCart={handleCart} handleFavourite={handleFavourite}/>
                    </Fragment>
                    :
                    <EmptyBanner
                        headerText = 'У вас нет заказов'
                        description='Заказать товар можно, добавив его в корзину с помощью кнопки + на карточке товара и оформив заказ в корзине'
                    />
                }
            </ContentWrapper>
        </Wrapper>
    );
};

export default Orders;