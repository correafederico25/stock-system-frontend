import React from 'react';

const Input = (props) => {

const handleChange = (e) => {
  props.handleChangeInput({
    value : e.target.value,
    name : e.target.name
  });
} 




    return (
        <>
        <div className="form-group mt-2">
          <label className="text-labels" htmlFor="">{props.textLabel}</label>
      {props.isSelectInput ? 
            <select className="form-control" name="role" onChange={handleChange} >
              <option value='' selected>Seleccione una opción</option>
               {props.options.map(item => {
                 return (<option value={item.value}>{item.label}</option>)
               })}
          
            </select>

      :
          <input type={props.type} className="form-control" placeholder={props.placeholder} value={props.value} name={props.name}  onChange={handleChange} />
          
          
      }
      </div>

        </>
    )
}

export default Input;
