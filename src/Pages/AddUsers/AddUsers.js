import React, { useState } from 'react';
import Layout from '../../Components/Layout/Layout';
import Swal from 'sweetalert2';
import Input from '../../Components/Input/Input';
import TitleDashboard from '../../Components/TitleDashoard/TitleDashboard';
import Card from '../../Components/Card/Card';
import Button from '../../Components/Button/Button';
import Spinner from '../../Components/Spinner/Spinner';
import { options} from '../../Options';
import { urlBackEnd } from '../../Functions/Functions';  
import FadeIn from 'react-fade-in';

const AddUsers = (props) => {
  var urlBack = urlBackEnd();
  
  const [repeatPassword, setRepeatPassword] = useState();
  const [activeSpinner, setActiveSpinner] = useState(false);
  const [dataEmployee, setDataEmployee] = useState({
    name: '',
    lastname: '',
    dni: '',
    email: '',
    address: '',
    dateOfAdmission: '',
    phoneNumber: '',
    password: '',
    role: '',
    state: "true",
  });


  const onRegisterEmployee = (e) => {

    e.preventDefault();

    setActiveSpinner(true);

    if (dataEmployee.name === "" ||
      dataEmployee.lastname === "" ||
      dataEmployee.dni === "" ||
      dataEmployee.email === "" ||
      dataEmployee.address === "" ||
      dataEmployee.dateOfAdmission === "" ||
      dataEmployee.phoneNumber === "" ||
      dataEmployee.password === "" ||
      dataEmployee.role === "" ||
      dataEmployee.state === "") {

      Swal.fire({
        icon: 'error',
        title: '',
        text: 'Por favor completa todos los datos para continuar',
      })
      setActiveSpinner(false);
      return
    }

    if (dataEmployee.password.length < 8) {
      Swal.fire({
        icon: 'error',
        title: '',
        text: 'La contraseña debe tener un mínimo de 8 caracteres',
      });
      setDataEmployee({
          name: '',
          lastname: '',
          dni: '',
          email: '',
          address: '',
          dateOfAdmission: '',
          phoneNumber: '',
          password: '',
          role: '',
          state: "true",
      })
      setActiveSpinner(false);
      return
    }


    if (dataEmployee.password !== repeatPassword) {
      Swal.fire({
        icon: 'error',
        title: '',
        text: 'Las contraseñas ingresada no coinciden',
      });
      setActiveSpinner(false);
      return
    }

    const hasToken = JSON.parse(localStorage.getItem('hasToken'));

    fetch("http://localhost:4000/auth/singup", {
      method: 'POST',
      body: JSON.stringify(dataEmployee),
      headers: new Headers({
        'Content-Type': 'application/json',
        'x-access-token': hasToken
      }),
    })
      .then((resp) => resp.json())
      .then((resp) => {
      console.log(resp)
        if (resp.errorCode === 'MA0200') {
          
          setActiveSpinner(false);
          Swal.fire({
            icon: 'success',
            title: resp.errorMsg,
            showConfirmButton: false,
            timer: 1500
          });
          return
        }
        setActiveSpinner(false);
        Swal.fire({
          icon: 'error',
          title: '',
          text: 'Por favor verifique los datos ingresados e intente nuevamente',
        })
        return

      })
  }

  const handleChangeInput = (e) => {
    setDataEmployee({
      ...dataEmployee,
      [e.name]: e.value
    })
  }

  const handleChangeRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  }

  return (

    <Layout>
      <form onSubmit={onRegisterEmployee} noValidate>
        <FadeIn>
        <TitleDashboard title={'Agregar usuario'} icon={<i className="fas fa-user-plus"></i>} />
        <div className="container-fluid px-1">
          <Card className="d-none d-md-block">
            <div className="row">
              <div className="col-md-6">
                <Input textLabel={"Nombre"} isSelectInput={false} type={"text"} placeholder={"Ingresá el nombre"} name={"name"} handleChangeInput={handleChangeInput} />
              </div>
              <div className="col-md-6">
                <Input textLabel={"Apellido"} isSelectInput={false} type={"text"} placeholder={"Ingresá el apellido"} name={"lastname"} handleChangeInput={handleChangeInput} />
              </div>
              <div className="col-md-6">
                <Input textLabel={"DNI"} isSelectInput={false} type={"number"} placeholder={"Ingresá el DNI"} name={"dni"} handleChangeInput={handleChangeInput} />
              </div>
              <div className="col-md-6">
                <Input textLabel={"Email"} isSelectInput={false} type={"text"} placeholder={"Ingresá el email"} name={"email"} handleChangeInput={handleChangeInput} />
              </div>
              <div className="col-md-6">
                <Input textLabel={"Direccion"} isSelectInput={false} type={"text"} placeholder={"Ingresá la dirección"} name={"address"} handleChangeInput={handleChangeInput} />
              </div>
              <div className="col-md-6">
                <Input textLabel={"Fecha de entrada"} isSelectInput={false} type={"date"} placeholder={"Elegí la fecha de entrada"} name={"dateOfAdmission"} handleChangeInput={handleChangeInput} />
              </div>
              <div className="col-md-6">
                <Input textLabel={"Contraseña"} isSelectInput={false} type={"password"} placeholder={"Ingresá la contraseña"} name={"password"} handleChangeInput={handleChangeInput} />
                <small id="passwordHelpBlock" class="form-text text-muted">
                  La contraseña debe tener un mínimo 8 caracteres.
                </small>
              </div>
              <div className="col-md-6">
                <div className="form-group mt-2">
                  <label className="text-labels" >Repetir contraseña</label>
                  <input className="form-control" type="password" placeholder="ingresá nuevamente tu contraseña" onChange={handleChangeRepeatPassword} />
                </div>
              </div>
              <div className="col-md-6">
                <Input textLabel={"Celular"} isSelectInput={false} type={"number"} placeholder={"Ingresá el numero de celular"} name={"phoneNumber"} handleChangeInput={handleChangeInput} />
              </div>
              <div className="col-md-6">
                <Input textLabel={"Rol"} isSelectInput={true} placeholder={"Ingresá el rol"} name={"role"} options={options} handleChangeInput={handleChangeInput} />
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <Button isBlock={false}>
                {'Registrar usuario'}
              </Button>
            </div>
          </Card>
        </div>
        </FadeIn>
        <Spinner isVisible={activeSpinner} />
      </form>
    </Layout>
  )
}

export default AddUsers;
