import React from 'react'
import './button.css'



const Button = (props) => {

    const btnBlock = 'btn btn-primary btn-block btn-app';
    const normalBtn = 'btn btn-primary btn-app';


    return (
        <>
        <button type='submit' className={ props.isBlock ? btnBlock : normalBtn }>
            {props.children}
        </button>  
        </>
    )
}

export default Button;
