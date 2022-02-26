import './styles.scss';
import Header from "../../components/Header";
import Search from "../../components/Search";
import React, {useContext, useEffect, useState} from "react";
import ContentHeader from "../../components/Container/ContentHeader";
import ContentWrapper from "../../components/Container";
import CardList from "../../components/CardList";
import Wrapper from "../../components/Wrapper";
import Context from "../../Context";

function Main() {
    const {goodsWithMarkers, handleFavourite, handleCart, searchParms, setSearchParms} = useContext(Context);

    const [filteredGoods, setFilteredGoods] = useState([]);

    useEffect(() => {
        const filteredGoods = goodsWithMarkers.filter(item => {
            return (searchParms != '') ? item.description.toLowerCase().includes(searchParms.toLowerCase().trim()) : true
        })

        setFilteredGoods(filteredGoods)
    }, [searchParms, goodsWithMarkers])


    return (
        <Wrapper>
            <Header/>
            <ContentWrapper>
                <ContentHeader>
                    <h1>Все кроссовки</h1>
                    <Search setSearchParms={setSearchParms}/>
                </ContentHeader>
                <CardList items={filteredGoods} handleCart={handleCart} handleFavourite={handleFavourite}/>
            </ContentWrapper>
        </Wrapper>
    )
}

export default Main;
