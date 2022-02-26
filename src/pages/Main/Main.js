import './styles.scss';
import Header from "../../components/Header";
import Search from "../../components/Search";
import React, {Fragment} from "react";
import ContentHeader from "../../components/Container/ContentHeader";
import ContentWrapper from "../../components/Container";
import CardList from "../../components/CardList";
import Wrapper from "../../components/Wrapper";

function Main({goodsWithMarkers, handleFavourite, handleCart, handleOrder, searchParms, setSearchParms}) {
const filteredGoods = goodsWithMarkers.filter(item => {
        return (searchParms != '') ? item.description.toLowerCase().includes(searchParms.toLowerCase().trim()) : true
    })

    return (
            <Wrapper>
                <Header goodsWithMarkers={goodsWithMarkers} handleCart={handleCart} handleOrder={handleOrder}/>
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
