import React from 'react';
import './styles.scss';
import Loader from "../Loader";

const ContentWrapper = ({children, isLoaded=true}) => {
    return (
        <div className="content-wrapper">
            {(isLoaded)? children: <Loader/>}
        </div>
    );
};

export default ContentWrapper;