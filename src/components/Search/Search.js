import React, {useEffect, useState} from 'react';
import './styles.scss'
const Search = ({setSearchParms}) => {

    const [inputText, setInputText] = useState('');
    const handleChange = (event) => {
     setInputText(event.target.value)


     }
     useEffect(()=>{
         setSearchParms(inputText);
     },[inputText])

    const handleDelete = (event) => {
        setInputText('')
    }


    return (
        <div className="search">
            <img src="/img/search.svg" alt="" className='search_find-icon'/>
            <input
                value = {inputText}
                onChange={handleChange}
                placeholder={'Найти...'}
                type="text"/>
            {inputText.trim()&&<img src="/img/delete.svg" className={'search_delete-icon'} onClick={handleDelete}/>}
        </div>
    );
};

export default Search;