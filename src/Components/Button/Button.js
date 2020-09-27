import React from 'react'
import './button.css'



const Button = (props) => {

    const btnBlock = 'btn btn-primary btn-block';
    const normalBtn = `btn btn-primary ${props.isLg? " " + "btn-lg" : "" }`;
   


    return (
        <>
        <button type='submit' className={ props.isBlock ? btnBlock : normalBtn }>
            {props.children}
        </button>  
        </>
    )
}

export default Button;
