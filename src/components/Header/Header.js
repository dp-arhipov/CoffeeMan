import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import './styles.scss'
import Cart from "../Cart";

const Header = ({goodsWithMarkers, handleCart}) => {

    const [cartIsOpen, setCartIsOpen] = useState(false);

    const handleCartIconClick = () => {
        if (!cartIsOpen) {
            document.body.style.paddingRight = computeSrollWidth() + 'px';
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
            document.body.style.paddingRight = '0';
        }
        setCartIsOpen(!cartIsOpen);
    }

    const computeSrollWidth = () => {
        window.scrollTo(1,1);
        // if we have vertical scrollbar
        if (window.pageYOffset == 0) {
            return 0;
        }
        window.scrollTo(0,0);

        let div = document.createElement('div');
        div.style.overflowY = 'scroll';
        div.style.width = '50px';
        div.style.height = '50px';
        document.body.append(div);

        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();
        return scrollWidth;
    }


    return (
        <div className="header">
            {cartIsOpen &&
            <Cart onClose={handleCartIconClick} items={goodsWithMarkers.filter(item => item.inCart == true)}
                  onDelete={handleCart}/>}
            <Link to='/'>
                <div className="header_left">

                    <img width={40} height={40} src='/img/logo.svg' alt=""/>

                    <div>
                        <h4>BEST SNIKERS</h4>
                        <p>Магазин кроссовок</p>
                    </div>

                </div>
            </Link>

            <ul className="header_right">
                <li className='backet' onClick={handleCartIconClick}>
                    <img width={18} height={18} src='/img/backet.svg' alt=""/>
                    <span>1205р</span></li>
                <li>
                    <Link to={'/favourites'}>
                        <img width={18} height={18} src='/img/heart.svg' alt=""/>
                    </Link>
                </li>
                <li>
                    <img width={18} height={18} src='/img/user.svg' alt=""/>
                </li>
            </ul>

        </div>
    );
};

export default Header;