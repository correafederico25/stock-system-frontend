import React, { useState, useEffect } from 'react';




function Login(props) {

  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  });
  const [errorMsg, setErrorMsg] = useState(false);
  const [isLogged, setIsLogged] = useState(false);




  const handleChange = e => {
    const { name, value } = e.target;
    setInputs(inputs => ({ ...inputs, [name]: value }));
  }

  const handleClickLogin = (e) => {
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
          if (resp.errorCode == 'MA099') {
            setErrorMsg(true)
          } else {
            if (resp.token !== null & resp.auth !== false) {
              localStorage.setItem("hasToken", JSON.stringify(resp.token));
              setIsLogged(true)
              props.history.push("/dashboard")
            } else {
              props.history.push("/")
            }
          }
        },
        (error) => {
          console.log(error)
        }
      )

  };


  return (

    <React.Fragment>
      <div className="container-fluid h-100 bg-gradient full-height">
        <div className="row justify-content-center align-items-center">
          <div className="col-12 col-sm-8 col-md-7 col-lg-5 col-xl-4 mt-5 pt-4">
            <form className="text-center border border-light py-4 px-4 bg-white border-style">
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
                  <a href="">¿Olvidaste la clave? {props.title}</a>
                </div>
              </div>
              <button className="btn btn-info btn-block my-4 btn-app" onClick={handleClickLogin}>Ingresar</button>
              <p>Síguenos en las redes</p>
              <a href="#" className="mx-2" role="button"><i className="fab fa-facebook-f light-blue-text"></i></a>
              <a href="#" className="mx-2" role="button"><i className="fab fa-twitter light-blue-text"></i></a>
              <a href="#" className="mx-2" role="button"><i className="fab fa-linkedin-in light-blue-text"></i></a>
              <a href="#" className="mx-2" role="button"><i className="fab fa-github light-blue-text"></i></a>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}


export default Login;

