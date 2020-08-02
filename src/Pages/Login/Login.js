import React, { useState } from 'react';
import Card from '../../Components/Card/Card';
import Spinner from '../../Components/Spinner/Spinner';
import Button from '../../Components/Button/Button';
import { Link } from 'react-router-dom';
import './login.css';
import {urlFrontEnd, urlBackEnd} from '../../Functions/Functions';  
import bguno from '../../images/header-bg.png';
import bgdos from '../../images/team-shape.png';


const Login = (props) => {
  var urlFront = urlFrontEnd();
  var urlBack = urlBackEnd();
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

    fetch(urlBack + "auth/singin", requestInfo)
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
      <div className="container-fluid full-height bg-login full-height">
        <div className="row justify-content-center align-items-center">
          <img src={bguno} alt="" className='positionimg'/>
          <img src={bgdos} alt="" className='positionimg1'/>
        <div className="w-100 d-flex justify-content-center px-2 text-center pb-3 pt-5">
            {/* <h3 className=" text-white">Bienvenido/a, inicia sesión para comenzar</h3> */}
          </div>
          <div className="col-12 col-sm-8 col-md-7 col-lg-5 col-xl-3 mt-3 z-index">
            <Card>
              <form className="text-center" onSubmit={ handleClickLogin } >
                <p className="bienvenido">Bienvenido</p>
                {errorMsg ? <div class="alert alert-danger" role="alert">
                  Por favor verifique los datos ingresados
              </div> : ''}
                <div className="icon-position">
                  <i class="fas fa-user"></i>
                  <input type="email" className="custom-form" placeholder="Email" name="email" onChange={handleChange} />
                </div>
                <div className="icon-position">
                  <i class="fas fa-lock"></i>
                  <input type="password" id="defaultLoginFormPassword" className="custom-form" placeholder="Contraseña" name="password" onChange={handleChange} />
                </div>
                <div className="d-flex justify-content-around">
                  <div>
                    <div className="custom-control custom-checkbox">
                      <input type="checkbox" className="custom-control-input" id="defaultLoginFormRemember" />
                      <label className="custom-control-label" for="defaultLoginFormRemember">Recordar usuario</label>
                    </div>
                  </div>
                </div>
                <div className='buttoningresar'>
                  <Button isBlock={true} >
                    { 'INGRESAR' }
                  </Button>
                </div>
                <div>
                  <a>¿Olvidaste la clave? {props.title}</a>
                </div>
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

