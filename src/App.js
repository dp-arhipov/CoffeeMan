import React, {useCallback, useEffect, useReducer, useState} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Favourites from "./pages/Favourites";
import Main from "./pages/Main";
import './App.scss'
import axios from "axios";
import Wrapper from "./components/Wrapper/Wrapper";
import Orders from "./pages/Orders";
import Context from "./context";
import useLocalStorage from "./customHooks/useLocalStorage";
import {getItems} from './services'
import {reducer, initialState, selectors} from './store.js'

const App = () => {

    const [goodsWithMarkers, setGoodsWithMarkers] = useState([]);
    const [searchParms, setSearchParms] = useState('')
    const [storedMarkers, setStoredMarkers] = useLocalStorage('storedMarkers')


    const [data, dispatch] = useReducer(reducer, initialState)

    useEffect(async () => {
        console.log(storedMarkers)
        const goods = await getItems();
        dispatch({type: "initGoods", payload: goods})
        if (storedMarkers) dispatch({type: "loadMarkers", payload: storedMarkers})
        else  dispatch({type: "initMarkers", payload: goods})

    }, [])


    useEffect(() => {
        const goodsWithMarkers = selectors.goodsWithMarkers(data)
        if(goodsWithMarkers){
            setGoodsWithMarkers(goodsWithMarkers)
        }
    }, [data])


    useEffect(() => {
        if (data.markers.length != 0) setStoredMarkers(data.markers);
    }, [data.markers])


    const handleCart = useCallback((action, itemId) => {
        if (action == 'add') {
            dispatch({type: "addItemInCart", payload: {id: itemId}})
        }
        if (action == 'delete') {
            dispatch({type: "deleteItemFromCart", payload: {id: itemId}})
        }
    })


    const handleFavourite = useCallback((action, itemId) => {
        if (action == 'add') {
            dispatch({type: "addItemToFavourite", payload: {id: itemId}})
        }
        if (action == 'delete') {
            dispatch({type: "deleteItemFromFavourite", payload: {id: itemId}})
        }
    })

    const handleOrder = () => {
        const orderNumber = Math.floor(Math.random() * 10000)
        dispatch({type: "moveItemsToHistory"})
        return orderNumber;
    }

    return (
        <Context.Provider value={{
            handleFavourite,
            handleCart,
            searchParms,
            goodsWithMarkers,
            setSearchParms,
            dispatch,
            handleOrder
        }}>
            <BrowserRouter>
                <Routes>
                    <Route path='/favourites' element={<Favourites/>}/>
                    <Route path='/orders' element={<Orders/>}/>
                    <Route path='/' element={<Main/>}/>
                </Routes>
            </BrowserRouter>
        </Context.Provider>
    );
};

export default App;