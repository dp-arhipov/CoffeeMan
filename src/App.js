import './App.scss';

function App() {
    return (
        <div className="App">
            <div className='wrapper'>

                <div className="overlay">
                    <div className="drawer">
                        <div className="cart">
                            <h1 className='cart_header'>Корзина</h1>
                            <div className="items-list">
                                <div className='cart_item'>
                                    <img width={133} height={112} src="/img/sneakers/5.jpg" alt=""/>
                                    <div className='cart_item-description'>
                                        <p>Мужские Кроссовки Nike Air Max 270</p>
                                        <span>12999</span>
                                    </div>
                                    <img className={'cart_item-btn'} height={32} width={32} src="/img/delete.svg"
                                         alt=""/>
                                </div>

                                <div className='cart_item'>
                                    <img width={133} height={112} src="/img/sneakers/5.jpg" alt=""/>
                                    <div className='cart_item-description'>
                                        <p>Мужские Кроссовки Nike Air Max 270</p>
                                        <span>12999</span>
                                    </div>
                                    <img className={'cart_item-btn'} height={32} width={32} src="/img/delete.svg"
                                         alt=""/>
                                </div>




                            </div>
                            <div className="cart-total">
                                <div className='cart-total-description'>
                                    <span>Итого:</span>
                                    <div className='cart-total-dots'></div>
                                    <span className='cart-total-price'>12999</span>
                                </div>
                                <button className='btn'>Оформить заказ
                                    <img className='btn-arrow' src="/img/arrow-right.svg" alt=""/>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>


                <div className="header">
                    <div className="header_left">
                        <img width={40} height={40} src='/img/logo.svg' alt=""/>
                        <div>
                            <h4>REACT SNIKERS</h4>
                            <p>Магазин лучших кроссовок</p>
                        </div>

                    </div>

                    <ul className="header_right">
                        <li className='backet'>
                            <img width={18} height={18} src='/img/backet.svg' alt=""/>
                            <span>1205р</span></li>
                        <li>
                            <img width={18} height={18} src='/img/heart.svg' alt=""/>
                        </li>
                        <li>
                            <img width={18} height={18} src='/img/user.svg' alt=""/>
                        </li>
                    </ul>

                </div>
                <div className="content">
                    <div className='content_header'>
                        <h1>Все кроссовки</h1>
                        <div className="search">
                            <img src="/img/search.svg" alt=""/>
                            <input
                                placeholder={'Найти...'}
                                type="text"/>
                        </div>
                    </div>
                    <div className="cards">


                        <div className='card'>
                            <div className='card_favourite'>
                                <img src="/img/heart-liked.svg" alt=""/>
                            </div>
                            <img className='card_img' width={133} height={112} src="/img/sneakers/5.jpg" alt=""/>
                            <p className='card_description'>Мужские Кроссовки Nike Blazer Mid Suede</p>
                            <div className='card_bottom'>
                                <div className='price'>
                                    <p>ЦЕНА</p>
                                    <span>12999</span>
                                </div>
                                <button>
                                    <img width={11} height={11} src="/img/plus.svg" alt=""/>
                                </button>
                            </div>
                        </div>


                        
                    </div>
                </div>
            </div>
        </div>
    )
        ;
}

export default App;
