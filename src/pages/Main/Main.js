import './styles.scss';
import Card from "../../components/Card";
import Header from "../../components/Header";
import Search from "../../components/Search";

function Main({goodsWithMarkers, handleFavourite, handleCart, searchParms, setSearchParms}) {


    return (
            <div className='wrapper'>
                <Header goodsWithMarkers={goodsWithMarkers} handleCart={handleCart}/>

                <div className="content">
                    <div className='content_header'>
                        <h1>Все кроссовки</h1>
                        <Search setSearchParms={setSearchParms}/>
                    </div>

                    <div className="cards">
                        {goodsWithMarkers
                            .filter(item => {
                                return (searchParms != '') ? item.description.toLowerCase().includes(searchParms.toLowerCase().trim()) : true
                            })

                            .map((item) => {
                                return (
                                    <Card
                                        key={item.id}
                                        id={item.id}
                                        description={item.description}
                                        price={item.price}
                                        imgSource={item.imgSource}
                                        onClickPlus={handleCart}
                                        inCart={item.inCart}
                                        onClickFavourite={handleFavourite}
                                        isFavourite={item.isFavourite}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
            </div>

    )

}

export default Main;
