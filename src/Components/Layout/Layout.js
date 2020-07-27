import React from 'react';

const Layout = (props) => {
    return (
        <>
        <div className="p-0 p-md-4">
        { props.children } 
        </div>
        </>
    )
}

export default Layout;
