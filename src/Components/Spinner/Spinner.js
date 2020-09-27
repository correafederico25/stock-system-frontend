import React from 'react'

const Spinner = (props) => {

    return (
        <>
            <div className={ props.isVisible ? 'spinner-container' : 'd-none' }>
            <div className="lds-dual-ring"></div>
            </div>
        </>
    )
}

export default Spinner;
