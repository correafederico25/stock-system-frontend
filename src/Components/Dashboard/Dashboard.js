import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Products from '../Products/Products';
import AddProduct from '../AddProduct/AddProduct';
import EditProducts from '../EditProducts/EditProducts';
import DeleteProduct from '../DeleteProduct/DeleteProduct';
import Users from '../Users/Users';
import AddUsers from '../AddUsers/AddUsers';
import EditUsers from '../EditUsers/EditUsers';
import DeleteUsers from '../DeleteUsers/DeleteUsers';


function Dashboard(props) {
  const [showOptions, setShowOptions] = useState(false)
  const [showUsersOptions, setShowUsersOptions] = useState(false)
  const [userInformation, setUserinformation] = useState({});
  const [users, setUsers] = useState({})
  const hidden = "d-none";
  const showDetail = "bg-white p-2 d-block mt-2 w-100 border-style text-left";

  const showSubmenu = () => {
    if (showOptions) {
      setShowOptions(false)
    } else {
      setShowOptions(true)
    }
  }

  const showUserSubmenu = () => {
    if (showUsersOptions) {
      setShowUsersOptions(false)
    } else {
      setShowUsersOptions(true)
    }
  }

  useEffect(() => {

    const hasToken = JSON.parse(localStorage.getItem('hasToken'));
    const invalidToken = localStorage.getItem('hasToken');

    if (typeof invalidToken !== 'string') {
      props.history.push("/")
    }

    const requestInfo = {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'x-access-token': hasToken
      }),
    };

    fetch("http://localhost:4000/auth/user-information", requestInfo)
      .then(res => res.json())
      .then(
        (resp) => {
          if (resp.auth) {
            setUserinformation(resp.dataUser)
          } else {
            props.history.push("/")
          }
        },
        (error) => {
          console.log(error)
        }
      )


    const requestAllUsers = {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'x-access-token': hasToken
      }),
    };

    fetch('http://localhost:4000/users/all', requestAllUsers)
      .then(res => res.json())
      .then(resp => {
        setUsers(resp)
      })
  }, []);


  const logOut = () => {
    localStorage.clear();
    props.history.push("/")
  }

  return (
    <React.Fragment>
      <Router>
        <div className="container-fluid">
          <div className="row">
            <div className="d-none d-md-block col-md-3 col-lg-2 p-0 bg-gradient">
              <nav className="navbar-nav full-height align-items-center p-2 text-center">
                <div>
                  <i class="fas fa-users-cog text-white icon-md"></i>
                  <h5 className="sidebar text-white">Panel de control</h5>
                </div>
                <hr className="sidebar-divider"></hr>
                <div className="d-flex justify-content-between align-items-center w-100 cursor-pointer p-1" onClick={showSubmenu} >
                  <div className="d-flex align-items-center">
                    <i class="far fa-folder-open icon-color text-white pr-2"></i>
                    <a className="text-white pr-2">Productos</a>
                  </div>
                  <div>
                    {showOptions ? <i class="fas fa-chevron-down text-white"></i> : <i class="fas fa-chevron-right ml-auto text-white"></i>}
                  </div>
                </div>
                <div className={showOptions ? showDetail : hidden}>
                  <div className="d-flex align-items-center  sidebar-font-color">
                    <i class="far fa-edit icon-xs"></i>
                    <Link className="m-2 d-block b-bottom cursor-pointer" to="/dashboard/products">Detalle de productos</Link>
                  </div>
                  <div className="d-flex align-items-center sidebar-font-color">
                    <i class="far fa-edit icon-xs"></i>
                    <Link className="m-2 d-block b-bottom cursor-pointer" to="/dashboard/add-product">Agregar productos</Link>
                  </div>
                  <div className="d-flex align-items-center  sidebar-font-color">
                    <i class="far fa-file icon-xs pr-icon"></i>
                    <Link className="m-2 d-block b-bottom cursor-pointer" to="/dashboard/edit-products">Editar Productos</Link>
                  </div>
                  <div className="d-flex align-items-center sidebar-font-color">
                    <i class="far fa-trash-alt icon-xs pr-icon-sidebar"></i>
                    <Link className="m-2 d-block b-bottom cursor-pointer" to="/dashboard/delete-product">Borrar productos</Link>
                  </div>
                </div>
                <hr className="sidebar-divider"></hr>
                <div className="d-flex justify-content-between align-items-center w-100 cursor-pointer p-1" onClick={showUserSubmenu}>
                  <div className="d-flex align-items-center">
                    <i class="fas fa-user-friends text-white pr-2"></i>
                    <a className="text-white pr-2">Usuarios</a>
                  </div>
                  <div>
                    {showUsersOptions ? <i class="fas fa-chevron-down text-white"></i> : <i class="fas fa-chevron-right ml-auto text-white"></i>}
                  </div>
                </div>
                <div className={showUsersOptions ? showDetail : hidden}>
                  <div className="d-flex align-items-center sidebar-font-color">
                    <i class="fas fa-user icon-xs pr-align-sidebar"></i>
                    <Link className="m-2 d-block b-bottom cursor-pointer" to="/dashboard/users">Usuarios</Link>
                  </div>
                  <div className="d-flex align-items-center sidebar-font-color">
                    <i class="fas fa-user-plus icon-xs"></i>
                    <Link className="m-2 d-block b-bottom cursor-pointer" to="/dashboard/add-users">Agregar usuarios</Link>
                  </div>
                </div>
                <hr className="sidebar-divider"></hr>
              </nav>
            </div>
            <div className="col-12 col-md-9 col-lg-10 p-0 bg-light">
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
                        {userInformation.name}
                      </a>
                      <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="#">Mis datos</a>
                        <a class="dropdown-item" href="#">Cambiar contraseña</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#" onClick={logOut}>Cerrar sesión</a>
                      </div>
                    </li>
                  </ul>
                </div>
              </nav>
              <div class="container-fluid full-height-sm">
                <div class="row">
                  <div class="col-12">

                    <Switch>
                      <Route path="/dashboard/add-users">
                        <AddUsers />
                      </Route>
                      <Route path="/dashboard/users">
                        <Users user={users} />
                      </Route>
                      <Route path="/dashboard/edit-user/:id">
                        <EditUsers />
                      </Route>
                      <Route path="/dashboard/delete-user/:id">
                        <DeleteUsers />
                      </Route>
                      <Route path="/dashboard/add-product">
                        <AddProduct />
                      </Route>
                      <Route path="/dashboard/delete-product">
                        <DeleteProduct />
                      </Route>
                      <Route path="/dashboard/edit-products">
                        <EditProducts />
                      </Route>
                      <Route path="/">
                        <Products />
                      </Route>
                    </Switch>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Router>
    </React.Fragment>

  )
}

export default Dashboard;


