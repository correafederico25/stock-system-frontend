import React from 'react';

const Layout = (props) => {
    return (
        <>
        <div className="p-3">
        { props.children } 
        </div>
        </>
    )
}

export default Layout;
