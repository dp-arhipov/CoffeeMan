import React, {memo, useState} from 'react'
import './styles.scss'

const Card = ({description, price, imgSource, id, inCart, isFavourite, ...props}) => {

    const onClickPlus = () => {
        if (!inCart) props.onClickPlus('add', id);
        else props.onClickPlus('delete', id);

    }
    const onClickFavourite = () => {
        if (!isFavourite) props.onClickFavourite('add', id);
        else props.onClickFavourite('delete', id);
    }
    return (
        <div className='card'>
            <div className='card_favourite' onClick={onClickFavourite}>
                <img width={32} height={32} src={(isFavourite) ? "/img/heart-liked.svg" : "/img/heart-unliked.png"}
                     alt=""/>
            </div>
            <img className='card_img' height={160} src={imgSource} alt=""/>
            <p className='card_description'>{description}</p>
            <div className='card_bottom'>
                <div className='price'>
                    <p>ЦЕНА</p>
                    <span>{price} ₽</span>
                </div>
                <button onClick={onClickPlus}>
                    <img width={32} height={32} src={(inCart) ? "/img/plus-pressed.svg" : "/img/plus.svg"} alt=""/>
                </button>
            </div>
        </div>
    )
}

export default memo(Card);