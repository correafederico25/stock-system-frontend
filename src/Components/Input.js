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
          <label className="text-white" htmlFor="">{props.textLabel}</label>
      {props.isSelectInput ? 
            <select className="form-control" name="provider" value="" onChange={handleChange} >
              <option default>Selecciona un proovedor</option>
              <option value="proovedor 1">Proovedor 1</option>
              <option value="proovedor 2">Proovedor 2</option>
              <option value="proovedor 3">Proovedor 3</option>
              <option value="proovedor 4">Proovedor 4</option>
            </select>

      :
          <input type={props.type} className="form-control" placeholder={props.placeholder} name={props.name} onChange={handleChange} />
      }
      </div>
        </>
    )
}

export default Input;
