import React, {Fragment, useCallback, useContext, useEffect, useState} from 'react';
import './styles.scss'

import Header from "../../components/Header";

import ContentWrapper from "../../components/Container";
import ContentHeader from "../../components/Container/ContentHeader";
import CardList from "../../components/CardList";
import Wrapper from "../../components/Wrapper";

import EmptyBanner from "../../components/EmptyBanner";
import Context from "../../Context";

const Favourites = () => {
    const {goodsWithMarkers, handleFavourite, handleCart, handleOrder} = useContext(Context);

    const [goodsInFavourites, setGoodsInFavourites] = useState([]);

    useEffect(() => {
        setGoodsInFavourites(goodsWithMarkers.filter(item => item.isFavourite == true))
    }, [goodsWithMarkers])

    return (
        <Wrapper>
            <Header/>
            <ContentWrapper>
                {(goodsInFavourites.length != 0)
                    ?
                    <Fragment>
                        <ContentHeader>
                            <h1>Мои закладки</h1>
                        </ContentHeader>
                        <CardList items={goodsInFavourites} handleCart={handleCart} handleFavourite={handleFavourite}/>
                    </Fragment>
                    :
                    <EmptyBanner
                        headerText='У вас нет закладок'
                        description='Добавить товар в закладки можно, нажав на сердечко на карточке товара'
                    />
                }
            </ContentWrapper>
        </Wrapper>
    );
};

export default Favourites;