import React, {memo, useContext} from 'react'
import './styles.scss'
import AmountBlock from "../AmountBlock";
import Context from "../../context";



const Card = ({description, price, amount, imgSource, id, isFavourite, needAmount=false}) => {
    const {dispatch} = useContext(Context);
    const onClickFavourite = (itemId) => {
        if (!isFavourite)  dispatch({type: "addItemToFavourite", payload: {id: itemId}})
        else  dispatch({type: "deleteItemFromFavourite", payload: {id: itemId}})
    }
    return (
        <div className='card'>
            <div className='card_favourite' onClick={()=>onClickFavourite(id)}>
                <img width={32} height={32} src={(isFavourite) ? "/img/heart-liked.svg" : "/img/heart-unliked.png"}
                     alt=""/>
            </div>
            <img className='card_img' height={160} src={imgSource} alt=""/>
            <p className='card_description'>{description}</p>
            <div className='card_bottom'>
                <div className='price'>
                    <p>ЦЕНА:</p>
                    <span>{price} ₽</span>
                </div>
                {needAmount&&<AmountBlock id={id} amount={amount}/>}
            </div>
        </div>
    )
}

export default memo(Card);