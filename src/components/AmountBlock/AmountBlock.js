import React from 'react';
import './styles.scss';

const AmountBlock = ({id, amount, ...props}) => {

    const onClickPlus = () => {
        props.onClickPlus('increaseItemAmount', id);
    }

    const onClickMinus = () => {
        props.onClickMinus('decreaseItemAmount', id);
    }

    return (
        <div class={'amount-block'}>
            <button onClick={onClickMinus}>
                -
            </button>
            <div className="amount">
                {amount}
            </div>

            <button onClick={onClickPlus}>
                +
            </button>
        </div>
    );
};

export default AmountBlock;

