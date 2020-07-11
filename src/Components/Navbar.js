import React from 'react';

const Navbar = (props) => {

    const childrenLogout = () => {
        props.logOut();
    }

    return (
        <>
               <nav class="navbar navbar-expand-md navbar-light bg-white pt-md-2 pb-md-2 border-style">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <i class="fas fa-bars"></i>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul class="navbar-nav mr-auto">

                  </ul>
                  <ul class="navbar-nav">
                    <li class="nav-item dropdown">
                      <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {props.userInfo.name}
                      </a>
                      <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="#">Mis datos</a>
                        <a class="dropdown-item" href="#">Cambiar contraseña</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#" onClick={childrenLogout}>Cerrar sesión</a>
                      </div>
                    </li>
                  </ul>
                </div>
              </nav>
        </>
    )
}

export default Navbar;
