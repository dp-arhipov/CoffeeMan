import React, {useCallback, useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Favourites from "./pages/Favourites/Favourites";
import Main from "./pages/Main/Main";
import './App.scss'
import axios from "axios";
import Wrapper from "./components/Wrapper/Wrapper";
import Orders from "./pages/Orders/Orders";

const App = () => {
    const [goods, setGoods] = useState([]);
    const [goodsWithMarkers, setGoodsWithMarkers] = useState([]);
    const [searchParms, setSearchParms] = useState('')

    useEffect(() => {
        (async function () {
            const goods = await getItems();
            setGoods(goods);
        }());
    }, [])

    useEffect(() => {
        setGoodsWithMarkers(
            goods.map((item) => {
                return {
                    ...item,
                    isFavourite: false,
                    inCart: false,
                    inHistory: false
                }
            }))
        const storedItems = localStorage.getItem('storedItems');
        if (storedItems !== null) setGoodsWithMarkers(JSON.parse(storedItems));
    }, [goods])

    useEffect(() => {
        if (goodsWithMarkers.length != 0)
            localStorage.setItem('storedItems', JSON.stringify(goodsWithMarkers));
    }, [goodsWithMarkers])

    const getItems = async () => {
        try {
            const {data} = await axios.get('https://621630187428a1d2a35e4ba5.mockapi.io/items/?page=1&limit=10')
            return data
        } catch (error) {
            console.log(error);
        }
        return []
    };

    const handleCart = useCallback((action, itemId) => {
        if (action == 'add') {
            const newGoodsWithMarkers = goodsWithMarkers.map((item) => {
                if (item.id == itemId) return {
                    ...item,
                    inCart: true
                }
                return item;
            });
            setGoodsWithMarkers(newGoodsWithMarkers);
        }
        if (action == 'delete') {
            const newGoodsWithMarkers = goodsWithMarkers.map((item) => {
                if (item.id == itemId) return {
                    ...item,
                    inCart: false
                }
                return item;
            });
            setGoodsWithMarkers(newGoodsWithMarkers);
        }

    })

    const handleFavourite = useCallback((action, itemId) => {
        if (action == 'add') {
            const newGoodsWithMarkers = goodsWithMarkers.map((item) => {
                if (item.id == itemId) return {
                    ...item,
                    isFavourite: true
                }
                return item;
            });
            setGoodsWithMarkers(newGoodsWithMarkers);
        }
        if (action == 'delete') {
            const newGoodsWithMarkers = goodsWithMarkers.map((item) => {
                if (item.id == itemId) return {
                    ...item,
                    isFavourite: false
                }
                return item;
            });
            setGoodsWithMarkers(newGoodsWithMarkers);
        }
    })


    const handleOrder = () => {
        const orderNumber = Math.floor(Math.random() * 10000)
        const newGoods = goodsWithMarkers.map(item => {
            if (item.inCart == true) {
                return {
                    ...item,
                    inCart: false,
                    inHistory: true
                }
            }
            return item
        })
        setGoodsWithMarkers(newGoods);
        return orderNumber;
    }


    return (
        <BrowserRouter>
            <Routes>
                <Route path='/favourites'
                       element={<Favourites handleFavourite={handleFavourite} handleCart={handleCart}
                                            goodsWithMarkers={goodsWithMarkers} handleOrder={handleOrder}/>}/>
                <Route path='/orders'
                       element={<Orders handleFavourite={handleFavourite} handleCart={handleCart}
                                            goodsWithMarkers={goodsWithMarkers} handleOrder={handleOrder}/>}/>
                <Route path='/' element={<Main handleFavourite={handleFavourite} handleCart={handleCart}
                                               searchParms={searchParms} goodsWithMarkers={goodsWithMarkers}
                                               setSearchParms={setSearchParms} handleOrder={handleOrder}/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default App;