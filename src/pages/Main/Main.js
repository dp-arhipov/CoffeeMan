import './styles.scss';
import Header from "../../components/Header";
import Search from "../../components/Search";
import React, {useContext, useEffect, useState} from "react";
import ContentHeader from "../../components/Container/ContentHeader";
import ContentWrapper from "../../components/Container";
import CardList from "../../components/CardList";
import Wrapper from "../../components/Wrapper";
import Context from "../../context";

function Main() {
    const {goodsWithMarkers, handleFavourite, handleCart, searchParms, setSearchParms} = useContext(Context);

    const [filteredGoods, setFilteredGoods] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false)
    console.log(document.getElementsByTagName('body')[0])

    useEffect(() => {
        const filteredGoods = goodsWithMarkers.filter(item => {
            return (searchParms != '') ? item.description.toLowerCase().includes(searchParms.toLowerCase().trim()) : true
        })
        setFilteredGoods(filteredGoods)
    }, [searchParms, goodsWithMarkers])

    useEffect(()=>{
        if(goodsWithMarkers.length==0) setIsLoaded(false)
        else setIsLoaded(true);
    },goodsWithMarkers)


    return (

        <Wrapper>
            <Header/>
            <ContentWrapper>
                <ContentHeader>
                    <h1>Весь ассортимент</h1>
                    <Search setSearchParms={setSearchParms}/>
                </ContentHeader>
                <CardList items={filteredGoods} handleCart={handleCart} handleFavourite={handleFavourite}/>
            </ContentWrapper>
        </Wrapper>

    )
}

export default Main;
