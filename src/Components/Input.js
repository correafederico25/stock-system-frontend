import React from 'react';

const Input = (props) => {

const handleChange = (e) => {
  props.handleChangeInput({
    "asd" : e.target.value,
    name : e.target.name
  });
} 
    return (
        <>
    <div className="form-group mt-2">
        <label htmlFor="">{props.textLabel}</label>
        <input type={props.type} className="form-control" placeholder={props.placeholder} name={props.name} onChange={handleChange} />
    </div>
        </>
    )
}

export default Input;
