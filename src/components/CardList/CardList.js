import React from 'react';
import './styles.scss';
const CardList = (props) => {

    return (
        <div className="cards">
            {props.children}
        </div>

    );
};

export default CardList;

