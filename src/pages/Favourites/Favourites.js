import React, {Fragment, useCallback, useContext, useEffect, useState} from 'react';
import './styles.scss'

import Header from "../../components/Header";

import ContentWrapper from "../../components/Container";
import ContentHeader from "../../components/Container/ContentHeader";
import AmountBlock from "../../components/AmountBlock";
import Wrapper from "../../components/Wrapper";

import EmptyBanner from "../../components/EmptyBanner";
import Context from "../../context";

const Favourites = () => {
    const {goodsWithMarkers, handleFavourite, handleCart} = useContext(Context);

    const [goodsInFavourites, setGoodsInFavourites] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        setIsLoaded(false)
        setGoodsInFavourites(goodsWithMarkers.filter(item => item.inFavourite == true))
        setIsLoaded(true)
    }, [goodsWithMarkers])

    return (
        <Wrapper>
            <Header/>
            <ContentWrapper isLoaded={isLoaded}>
                {(goodsInFavourites.length != 0)
                    ?
                    <Fragment>
                        <ContentHeader>
                            <h1>Мои закладки</h1>
                        </ContentHeader>
                        <AmountBlock items={goodsInFavourites} handleCart={handleCart} handleFavourite={handleFavourite}/>
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