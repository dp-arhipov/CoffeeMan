import React, {useContext} from 'react';
import './styles.scss';
import Context from "../../context";

const AmountBlock = ({id, amount}) => {

    const {dispatch} = useContext(Context);

    const onClickPlus = (itemId) => {
        dispatch({type: "increaseItemAmount", payload: {id: itemId}})
    }

    const onClickMinus = (itemId) => {
        dispatch({type: "decreaseItemAmount", payload: {id: itemId}})
    }

    return (
        <div class={'amount-block'}>
            <button onClick={()=>onClickMinus(id)}>
                -
            </button>
            <div className="amount">
                {amount}
            </div>

            <button onClick={()=>onClickPlus(id)}>
                +
            </button>
        </div>
    );
};

export default AmountBlock;

