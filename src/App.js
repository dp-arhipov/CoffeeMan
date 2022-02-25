import React, {useCallback, useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Favourites from "./pages/Favourites/Favourites";
import Main from "./pages/Main/Main";
import './App.scss'
import axios from "axios";

const App = () => {
    const [goods, setGoods] = useState([]);
    const [goodsWithMarkers, setGoodsWithMarkers] = useState([]);
    const [searchParms, setSearchParms] = useState('')

    useEffect(async () => {
        const goods = await getItems();
        setGoods(goods);
    }, [])

    useEffect(() => {
        setGoodsWithMarkers(
            goods.map((item) => {
                return {
                    ...item,
                    isFavourite: false,
                    inCart: false
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
        const responce = await axios.get('https://621630187428a1d2a35e4ba5.mockapi.io/items/?page=1&limit=5')
            .catch(function (error) {
                console.log(error);
            });
        return responce.data
    };

    const handleCart =useCallback( (action, itemId) => {
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



    return (
        <BrowserRouter>
            <Routes>
                <Route  path='/favourites' element={<Favourites handleFavourite={handleFavourite} handleCart={handleCart} goodsWithMarkers={goodsWithMarkers}/>}/>
                <Route  path='/' element={<Main handleFavourite={handleFavourite} handleCart={handleCart} searchParms={searchParms} goodsWithMarkers={goodsWithMarkers} setSearchParms={setSearchParms}/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default App;