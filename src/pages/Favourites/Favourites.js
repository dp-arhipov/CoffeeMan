import React, {useCallback, useEffect, useState} from 'react';
import './styles.scss'
import Card from "../../components/Card";
import Header from "../../components/Header";
import Search from "../../components/Search";

const Favourites = ({goodsWithMarkers, handleFavourite, handleCart}) => {

    return (
        <div className='wrapper'>
            <Header goodsWithMarkers={goodsWithMarkers} handleCart={handleCart}/>
            <div className="content">
                <div className='content_header'>
                    <h1>Мои закладки</h1>

                </div>
                <div className="cards">
                    {goodsWithMarkers
                        .filter(item => {
                            return item.isFavourite == true
                        })

                        .map((item) => {
                            return (
                                <Card
                                    key={item.id}
                                    id={item.id}
                                    description={item.description}
                                    price={item.price}
                                    imgSource={item.imgSource}
                                    onClickPlus={handleCart}
                                    inCart={item.inCart}
                                    onClickFavourite={handleFavourite}
                                    isFavourite={item.isFavourite}
                                />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default Favourites;