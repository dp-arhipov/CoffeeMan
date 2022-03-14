import React, {Fragment, useCallback, useContext, useEffect, useState} from 'react';
import './styles.scss'

import Header from "../../components/Header";
import ContentWrapper from "../../components/Container";
import ContentHeader from "../../components/Container/ContentHeader";
import AmountBlock from "../../components/AmountBlock";
import Wrapper from "../../components/Wrapper";
import EmptyBanner from "../../components/EmptyBanner";
import Context from "../../context";


const Orders = () => {
    const {goodsWithMarkers, handleFavourite, handleCart, handleOrder} = useContext(Context);
    const [goodsInOrders, setGoodsInOrders] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        setIsLoaded(false)
        setGoodsInOrders(goodsWithMarkers.filter(item => item.inHistory == true))
        setIsLoaded(true)
    }, [goodsWithMarkers])

    return (
        <Wrapper>
            <Header/>

            <ContentWrapper isLoaded={isLoaded}>
                    {(goodsInOrders.length != 0)
                        ?
                        <Fragment>
                            <ContentHeader>
                                <h1>Мои заказы</h1>
                            </ContentHeader>
                            <AmountBlock items={goodsInOrders} handleCart={handleCart} handleFavourite={handleFavourite}/>
                        </Fragment>
                        :
                        <EmptyBanner
                            smileType={1}
                            headerText='У вас нет заказов'
                            description='Заказать товар можно, добавив его в корзину с помощью кнопки + на карточке товара и оформив заказ в корзине'
                        />
                    }
            </ContentWrapper>
        </Wrapper>
    );
};

export default Orders;