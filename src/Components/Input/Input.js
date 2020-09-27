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
          <label className="text-labels">{props.textLabel}</label>
      {props.isSelectInput ? 
            <select className="form-control" name={props.name} onChange={handleChange} >
              <option defaultValue={props.value || ''} selected={props.selected ? true : ''}>Seleccione una opción</option>
               {props.options.map(item => {
                 return (<option value={item.valueSelect ? item.valueSelect : item.label}>{item.label}</option>)
               })}
        
          
            </select>

      :
          <input type={props.type} className="form-control" placeholder={props.placeholder} value={props.value} name={props.name} disabled={props.disabled && true}  onChange={handleChange} />
          
          
      }
      </div>

        </>
    )
}

export default Input;
