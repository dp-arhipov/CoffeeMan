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

const Favourites = () => {
    const {goodsWithMarkers, handleFavourite} = useContext(Context);

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
                        <CardList>
                            {goodsInFavourites.map((item) => {
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
                        headerText='У вас нет закладок'
                        description='Добавить товар в закладки можно, нажав на сердечко на карточке товара'
                    />
                }
            </ContentWrapper>
        </Wrapper>
    );
};

export default Favourites;