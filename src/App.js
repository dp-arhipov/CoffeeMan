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


const App = () => {

    // const [goods, setGoods] = useState([]);
    const [goodsWithMarkers, setGoodsWithMarkers] = useState([]);
    const [searchParms, setSearchParms] = useState('')
    const [storedItems, setStoredItems] = useLocalStorage('storedItems')

    const init = (state) => {

        console.log(state)
        return {...state};
    }

    const reducer = (state, action) => {

        const changeProp = (array, itemId, propName, propValue) => {
            const newArray = array.map((item) => {
                if (item.id == itemId) return {
                    ...item,
                    [propName]: propValue
                }
                return item;
            });
            return newArray;
        }

        switch (action.type) {
            case 'initGoods': {
                return {
                    goods: action.payload
                }
            }
            case 'initGoodsWithMarkers': {
                const goods = state.goods;
                const goodsWithMarkers = goods.map((item) => {
                    return {
                        ...item,
                        inFavourite: false,
                        inCart: false,
                        inHistory: false
                    }
                })

                const goodsWithMarkers2 = goods.map((item) => {
                    return {
                        id: item.id,
                        inFavourite: false,
                        inCart: false,
                        inHistory: false
                    }
                })

                return {
                    ...state,
                    goodsWithMarkers: goodsWithMarkers
                }
            }

            case 'initGoodsWithMarkersLocal': {

                return {
                    ...state,
                    goodsWithMarkers: action.payload
                }
            }

            case 'addItemInCart' : {
                const itemId = action.payload.id
                const goodsWithMarkers = changeProp(state.goodsWithMarkers, itemId, 'inCart', true)
                return {
                    ...state,
                    goodsWithMarkers
                }
            }

            case 'deleteItemFromCart' : {
                const itemId = action.payload.id
                const goodsWithMarkers = changeProp(state.goodsWithMarkers, itemId, 'inCart', false)
                return {
                    ...state,
                    goodsWithMarkers
                }
            }

            case 'addItemToFavourite' : {
                const itemId = action.payload.id
                const goodsWithMarkers = changeProp(state.goodsWithMarkers, itemId, 'inFavourite', true)
                return {
                    ...state,
                    goodsWithMarkers
                }
            }

            case 'deleteItemFromFavourite' : {
                const itemId = action.payload.id
                const goodsWithMarkers = changeProp(state.goodsWithMarkers, itemId, 'inFavourite', false)
                return {
                    ...state,
                    goodsWithMarkers
                }
            }

            case 'moveItemsToHistory' : {
                const goodsWithMarkers = state.goodsWithMarkers.map(item => {
                    if (item.inCart == true) {
                        return {
                            ...item,
                            inCart: false,
                            inHistory: true
                        }
                    }
                    return item
                })
                return {
                    ...state,
                    goodsWithMarkers
                }
            }
            default:
                return state;
        }
    }

    const [data, dispatch] = useReducer(reducer, {goodsWithMarkers: []}, init)

    useEffect(() => {
        if (data.goodsWithMarkers) setGoodsWithMarkers(data.goodsWithMarkers)
    }, [data.goodsWithMarkers])

    useEffect(async () => {
        const goods = await getItems();
        dispatch({type: "initGoods", payload: goods})
        if (storedItems) dispatch({type: "initGoodsWithMarkersLocal", payload: storedItems})
    }, [])

    useEffect(() => {
        if (goodsWithMarkers.length != 0) setStoredItems(goodsWithMarkers);
    }, [goodsWithMarkers])



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