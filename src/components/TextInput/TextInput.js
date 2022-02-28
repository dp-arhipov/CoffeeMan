import React, {Fragment} from 'react';
import './styles.scss'

const TextInput = ({placeholder, value, onChange, error, errorMessage}) => {
    if (error) console.log('ошибка')
    return (
        <Fragment>
            <input className={(error) ? 'text-input text-input__error' : 'text-input'} value={value} onChange={onChange}
                   placeholder={placeholder}></input>
            <div className='text-input__error-message'>{errorMessage}</div>
        </Fragment>
    );
};

export default TextInput;