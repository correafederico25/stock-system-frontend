import React from 'react'

const Card = (props) => {
    return (
        <>
            <div className="p-3 card-container mb-5">
                {props.children}
            </div>
        </>
    )
}

export default Card;
