import React from 'react';
import Layout from '../../Components/Layout';
import Swal from 'sweetalert2';
import Input from '../../Components/Input';

function AddUsers() {
  var isNameValidEmployee = false;
  var isLastNameValidEmployee = false;
  var isDocumentNumberValidEmployee = false;
  var isAgeValidEmployee = false;
  var isIdValidEmployee = false;
  //----------------------------------------------------REGISTER EMPLOYEE-----------------------------------------------------------------------------------------//

//   const [isFormEmployeeValid, setisFormEmployeeValid] = React.useState(false);
  
//   const [classNameName, setClassNameName] = React.useState("form-control");
//   const [classNameLastname, setClassNameLastname] = React.useState("form-control");
//   const [classNameDocumentNumber, setClassNameDocumentNumber] = React.useState("form-control");
//   const [classNameDateOfBirth, setClassNameDateOfBirth] = React.useState("form-control");
//   const [classNameAge, setClassNameAge] = React.useState("form-control");
//   const [classNameId, setClassNameId] = React.useState("form-control");
  const [dataEmployee, setDataEmployee] = React.useState({
    name: '',
    lastname: '',
    documentNumber: '',
    dateOfBirth: '',
    age: '',
    id: ''
  })


const onRegisterEmployee = () => {
alert("ure")
}
    
const handleChangeInput = (e) =>{
      setDataEmployee({
        ...dataEmployee,
        [e.name]: e.asd
    })
    console.log(dataEmployee)
}

    return (
        <Layout>
             <div className="container">
          <div className="row d-flex justify-content-center">

          </div>
          <div className="row d-flex justify-content-center">
            <div className="col-5 background-black border-radius-20px mr-4 ml-4">
              <form>
                <div className="row d-flex w-100 justify-content-center pt-4">
                  <h4 className="color-white">REGISTRAR EMPLEADO</h4>
                </div>
                <Input textLabel={"Prueba"} type={"text"} placeholder={"Placeholder"} name={"name"} handleChangeInput={handleChangeInput}/>
                <Input textLabel={"Prueba"} type={"date"} placeholder={"Placeholder"} name={"lastname"} handleChangeInput={handleChangeInput}/>
                {/* <div className="form-group mt-2">
                  <label htmlFor="exampleInputEmail1">Nombre</label>
                  <input type="text" className={classNameName} placeholder="Ingresa tu nombre" value={dataEmployee.name} name="name" onChange={(e) => onChangeFormEmployee(e)} />
                  <div className="invalid-feedback">
                    Minimo 4 caracteres.
                </div>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Apellido</label>
                  <input type="text" className={classNameLastname} placeholder="Ingresa tu apellido" value={dataEmployee.lastname} name="lastname" onChange={(e) => { onChangeFormEmployee(e) }} />
                  <div className="invalid-feedback">
                    Minimo 4 caracteres.
                </div>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">DNI</label>
                  <input type="number" className={classNameDocumentNumber} placeholder="Ingresa tu DNI" value={dataEmployee.documentNumber} name="documentNumber" onChange={(e) => onChangeFormEmployee(e)} />
                  <div className="invalid-feedback">
                    Ingrese un documento valido.
                </div>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Fecha de nacimiento</label>
                  <input type="date" className={classNameDateOfBirth} placeholder="Ingresa tu fecha de nacimiento" value={dataEmployee.dateOfBirth} name="dateOfBirth" onChange={(e) => onChangeFormEmployee(e)} />
                  <div className="invalid-feedback">
                    Ingrese su fecha de nacimiento.
                </div>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Edad</label>
                  <input type="number" className={classNameAge} placeholder="Ingresa tu edad" value={dataEmployee.age} name="age" onChange={(e) => onChangeFormEmployee(e)} />
                  <div className="invalid-feedback">
                    Ingrese una edad válida.
                </div>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Id / cédula</label>
                  <input type="number" className={classNameId} placeholder="Ingresa id/cédula" value={dataEmployee.id} name="id" onChange={(e) => onChangeFormEmployee(e)} />
                  <div className="invalid-feedback">
                    Ingrese una cédula.
                </div>
                </div> */}
                <button type="button" className="btn btn-warning mt-3 mb-3" onClick={() => onRegisterEmployee()}>Registrar empleado</button>
              </form>
            </div>

          </div>
        </div>
        </Layout>
    )
}

export default AddUsers;
