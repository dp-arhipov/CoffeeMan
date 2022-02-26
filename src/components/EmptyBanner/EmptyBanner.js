import React from 'react';
import './styles.scss'
import {Link} from "react-router-dom";
import Button from "../Button";

const EmptyBanner = ({description, headerText}) => {
    return (
        <div className='emty_banner'>
            <div className='centerXY'>
                <img className='smile' src="/img/sad-smile-2.svg" alt=""/>
                <h2>{headerText}</h2>
                <p>{description}</p>
                <Link to='/'>
                    <Button type='arrow-left'>Вернуться к покупкам</Button>
                </Link>
            </div>
        </div>
    );
};

export default EmptyBanner;