import React from 'react';
import './styles.scss';
import Card from "../Card";
const CardList = ({items, handleCart, handleFavourite}) => {

    return (
        <div className="cards">
            {items.map((item) => {
                    return (
                        <Card
                            key={item.id}
                            id={item.id}
                            amount={item.amount}
                            description={item.description}
                            price={item.price}
                            imgSource={item.imgSource}
                            onClickPlus={handleCart}
                            onClickMinus={handleCart}
                            inCart={item.inCart}
                            onClickFavourite={handleFavourite}
                            isFavourite={item.inFavourite}
                        />
                    )
                })
            }
        </div>

    );
};

export default CardList;

