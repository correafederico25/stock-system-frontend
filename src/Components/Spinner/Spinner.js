import React from 'react'

const Spinner = (props) => {

    return (
        <>
            <div className={ props.isVisible ? 'spinner-container' : 'd-none' }>
                <div class="spinner">
                    <div class="bounce1"></div>
                    <div class="bounce2"></div>
                    <div class="bounce3"></div>
                </div>
            </div>
        </>
    )
}

export default Spinner;
