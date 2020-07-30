import React, { useState } from 'react';
import Card from '../../Components/Card/Card';
import Spinner from '../../Components/Spinner/Spinner';
import Button from '../../Components/Button/Button';
import { Link } from 'react-router-dom';



const Login = (props) => {

  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  });
  const [errorMsg, setErrorMsg] = useState(false);
  const [isLoading, setIsLoading] = useState();

  const handleChange = e => {

    const { name, value } = e.target;
    setInputs(inputs => ({ ...inputs, [name]: value }));

  }

  const handleClickLogin = (e) => {

    setIsLoading(true);

    e.preventDefault();
    const requestInfo = {
      method: 'POST',
      body: JSON.stringify(inputs),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    };

    fetch("http://localhost:4000/auth/singin", requestInfo)
      .then(res => res.json())
      .then(
        (resp) => {
          if (resp.errorCode !== 'MA0200') {
            setErrorMsg(true);
            setIsLoading(false);
          }
          if (resp.errorCode === 'MA0200') {
            localStorage.setItem("hasToken", JSON.stringify(resp.authToken));
            setIsLoading(false);
            props.history.push("/dashboard");
          } else {
            props.history.push("/");
            setIsLoading(false);
          }
        }
      ).catch(
        console.warn
      )
  };


  return (

    <>
      <div className="container-fluid full-height bg-sidebar full-height">
        <div className="row justify-content-center align-items-center">
        <div className="w-100 d-flex justify-content-center px-2 text-center pb-3 pt-5 mt-4">
            <h3 className=" text-white">Bienvenido/a, inicia sesión para comenzar</h3>
          </div>
          <div className="col-12 col-sm-8 col-md-7 col-lg-5 col-xl-4 mt-3 z-index">
            <Card>
              <form className="text-center py-4 px-4 bg-white" onSubmit={ handleClickLogin } >
                <p className="h4 mb-4">Iniciar sesión</p>
                {errorMsg ? <div class="alert alert-danger" role="alert">
                  Por favor verifique los datos ingresados
              </div> : ''}
                <div className="icon-position">
                  <i class="fas fa-user"></i>
                  <input type="email" className="custom-form mb-4" placeholder="E-mail" name="email" onChange={handleChange} />
                </div>
                <div className="icon-position">
                  <i class="fas fa-lock"></i>
                  <input type="password" id="defaultLoginFormPassword" className="custom-form mb-4" placeholder="Contraseña" name="password" onChange={handleChange} />
                </div>
                <div className="d-flex justify-content-around">
                  <div>
                    <div className="custom-control custom-checkbox">
                      <input type="checkbox" className="custom-control-input" id="defaultLoginFormRemember" />
                      <label className="custom-control-label" for="defaultLoginFormRemember">Recordar usuario</label>
                    </div>
                  </div>
                  <div>
                    <a>¿Olvidaste la clave? {props.title}</a>
                  </div>
                </div>
                <Button isBlock={true} >
                  { 'Ingresar' }
                </Button>
              </form>
            </Card>
            {(isLoading) && <Spinner isVisible={true} />}
          </div>
        </div>
      </div>
    </>
  )
}


export default Login;

