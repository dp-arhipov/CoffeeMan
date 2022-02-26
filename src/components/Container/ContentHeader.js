import React from 'react';
import './styles.scss';
const ContentHeader = ({children}) => {
    return (
        <div className='content-header'>
            {children}
        </div>
    );
};

export default ContentHeader;