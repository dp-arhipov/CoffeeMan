import './styles.scss';
import Header from "../../components/Header";
import Search from "../../components/Search";
import React, {useContext, useEffect, useState} from "react";
import ContentHeader from "../../components/Container/ContentHeader";
import ContentWrapper from "../../components/Container";
import Wrapper from "../../components/Wrapper";
import Context from "../../context";
import CardList from "../../components/CardList/CardList";
import Card from "../../components/Card";

function Main() {
    const {goodsWithMarkers, handleFavourite, searchParms, setSearchParms} = useContext(Context);

    const [filteredGoods, setFilteredGoods] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        const filteredGoods = goodsWithMarkers.filter(item => {
            return (searchParms != '') ? item.description.toLowerCase().includes(searchParms.toLowerCase().trim()) : true
        })
        setFilteredGoods(filteredGoods)
    }, [searchParms, goodsWithMarkers])

    useEffect(()=>{
        if(goodsWithMarkers.length==0) setIsLoaded(false)
        else setIsLoaded(true);
    },[goodsWithMarkers])


    return (

        <Wrapper>
            <Header/>
            <ContentWrapper isLoaded={isLoaded}>
                <ContentHeader>
                    <h1>Весь ассортимент</h1>
                    <Search setSearchParms={setSearchParms}/>
                </ContentHeader>
                <CardList>
                    {filteredGoods.map((item) => {
                        return (
                            <Card
                                key={item.id}
                                id={item.id}
                                amount={item.amount}
                                description={item.description}
                                price={item.price}
                                imgSource={item.imgSource}
                                inCart={item.inCart}
                                onClickFavourite={handleFavourite}
                                isFavourite={item.inFavourite}
                                needAmount={true}
                            />
                        )
                    })
                    }
                </CardList>

            </ContentWrapper>
        </Wrapper>

    )
}

export default Main;
