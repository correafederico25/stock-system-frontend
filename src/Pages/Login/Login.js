import React, { useState } from 'react';
import Card from '../../Components/Card/Card';
import Spinner from '../../Components/Spinner/Spinner';
import Button from '../../Components/Button/Button';
import './login.css';
import FadeIn from 'react-fade-in';
import SpinnerLogin from '../../Components/SpinnerLogin/SpinnerLogin';

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
      <div className="container-fluid full-height bg-login full-height bg-login">
        <div className="row justify-content-center align-items-center">
        <div className="w-100 d-flex justify-content-center px-2 text-center pb-3 pt-5">
          </div>
          <div className="col-12 col-sm-8 col-md-7 col-lg-5 col-xl-4 mt-3 z-index">
            <FadeIn>
            <Card>
              <form className="text-center" onSubmit={ handleClickLogin } >
                <p className="bienvenido">Bienvenido</p>
                {errorMsg ? 
                <FadeIn>
                <div class="alert alert-danger" role="alert">
                  Por favor verifique los datos ingresados
              </div>
              </FadeIn> : ''}
                <div className="icon-position">
                  <i class="fas fa-user"></i>
                  <input autocomplete="off" type="email" className="custom-form" placeholder="Email" name="email" onChange={handleChange} />
                </div>
                <div className="icon-position">
                  <i class="fas fa-lock"></i>
                  <input  autocomplete="off" type="password" id="defaultLoginFormPassword" className="custom-form" placeholder="Contraseña" name="password" onChange={handleChange} />
                </div>
                <div>
                  <a>¿Olvidaste la clave? {props.title}</a>
                </div>
                <div className="mt-3">
                  <Button isBlock={true} >
                    { 'Ingresar' }
                  </Button>
                  </div>
              </form>
            </Card>
            </FadeIn>
            {(isLoading) && <SpinnerLogin isVisible={true} />}
          </div>
        </div>
      </div>
    </>
  )
}


export default Login;

