import React from 'react';
import './styles.scss'

const Button = ({type, onClick, children}) => {
    return (
        <button className='btn' onClick={onClick}>
            {(type=='arrow-left')&&<img className='btn-arrow-left' src="/img/arrow-left.svg" alt=""/>}
            {children}
            {(type=='arrow-right')&&<img className='btn-arrow-right' src="/img/arrow-right.svg" alt=""/>}
        </button>
    );
};

export default Button;