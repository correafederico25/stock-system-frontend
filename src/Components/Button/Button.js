import React from 'react'



const Button = (props) => {

    const btnBlock = 'btn btn-primary btn-block my-4 btn-app';
    const normalBtn = 'btn btn-primary my-4 btn-app';


    return (
        <>
        <button type='submit' className={ props.isBlock ? btnBlock : normalBtn }>
            {props.children}
        </button>  
        </>
    )
}

export default Button;
