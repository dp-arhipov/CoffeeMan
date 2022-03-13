import React, {Fragment, useContext, useEffect, useState} from 'react';
import './styles.scss'

import Header from "../../components/Header";
import ContentWrapper from "../../components/Container";
import ContentHeader from "../../components/Container/ContentHeader";
import Wrapper from "../../components/Wrapper";
import EmptyBanner from "../../components/EmptyBanner";
import Context from "../../context";
import CardList from "../../components/CardList/CardList";
import Card from "../../components/Card/Card";


const Orders = () => {
    const {goodsWithMarkers, handleFavourite} = useContext(Context);
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
                                <h1>Мои покупки</h1>
                            </ContentHeader>
                            <CardList>
                                {goodsInOrders.map((item) => {
                                    return (
                                        <Card
                                            key={item.id}
                                            id={item.id}
                                            amount={item.amount}
                                            description={item.description}
                                            price={item.price}
                                            imgSource={item.imgSource}
                                            inCart={item.inCart}
                                            onClickFavourite={handleFavourite}
                                            isFavourite={item.inFavourite}
                                            needAmount={false}
                                        />
                                    )
                                })
                                }
                            </CardList>
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