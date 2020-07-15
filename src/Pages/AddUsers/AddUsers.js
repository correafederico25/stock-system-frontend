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
            <div className="col-6 background-colorSideBar border-radius-20px mr-4 ml-4">
              <form>
                <div className="row d-flex w-100 justify-content-center pt-4">
                  <h4 className="text-white">REGISTRAR EMPLEADO</h4>
                </div>
                <Input textLabel={"Nombre"} isSelectInput={false} type={"text"} placeholder={"Ingresá el nombre"} name={"name"} handleChangeInput={handleChangeInput}/>
                <Input textLabel={"Apellido"} isSelectInput={false} type={"text"} placeholder={"Ingresá el apellido"} name={"lastname"} handleChangeInput={handleChangeInput}/>
                <Input textLabel={"DNI"} isSelectInput={false} type={"number"} placeholder={"Ingresá el DNI"} name={"lastname"} handleChangeInput={handleChangeInput}/>
                <Input textLabel={"Email"} isSelectInput={false} type={"text"} placeholder={"Ingresá el email"} name={"email"} handleChangeInput={handleChangeInput}/>
                <Input textLabel={"Fecha de entrada"} isSelectInput={false} type={"date"} placeholder={"Elegí la fecha de entrada"} name={"dateOfAdmission"} handleChangeInput={handleChangeInput}/>
                <Input textLabel={"Celular"} isSelectInput={false} type={"number"} placeholder={"Ingresá el numero de celular"} name={"phoneNumber"} handleChangeInput={handleChangeInput}/>
                <Input textLabel={"Contraseña"} isSelectInput={false} type={"password"} placeholder={"Ingresá la contraseña"} name={"password"} handleChangeInput={handleChangeInput}/>
                <Input textLabel={"Rol"} isSelectInput={true} placeholder={"Ingresá el rol"} name={"role"} handleChangeInput={handleChangeInput}/>
                <button type="button" className="btn btn-warning mt-3 mb-3" onClick={() => onRegisterEmployee()}>Registrar empleado</button>
              </form>
            </div>

          </div>
        </div>
        </Layout>
    )
}

export default AddUsers;
