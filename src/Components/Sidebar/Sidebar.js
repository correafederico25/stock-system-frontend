import React, { useState } from 'react';
import { Link } from "react-router-dom";

const Sidebar = () => {

  const hidden = "d-none";
  const showDetail = "p-2-rem d-block w-100 text-left";
  const [showOptions, setShowOptions] = useState(false)
  const [showUsersOptions, setShowUsersOptions] = useState(false)
  const [showProviderOptions, setShowProviderOptions] = useState(false);

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

  const showProviderSubmenu = () => {
    if (showProviderOptions) {
      setShowProviderOptions(false)
    } else {
      setShowProviderOptions(true)
    }
  }

  return (
    <>
      <nav className="navbar-nav full-height align-items-center text-center">
        <div className="header-sidebar cursor-pointer">
          <Link to="/dashboard"><h5 className="sidebar text-white">App Control</h5></Link>
        </div>
        <div className="d-flex justify-content-start pl-4 w-100 mb-3 text-white">
          <span>Opciones</span>
        </div>

       
        <div className="d-flex justify-content-between align-items-center w-100 cursor-pointer sidebar-link" >
        <Link to="/dashboard">
          <div className="d-flex align-items-center">
          <i class="fas fa-home text-white pr-3"></i>
            <a className="text-white pr-2">Home</a>
          </div>
          </Link>
        </div>
      

        <div className="d-flex justify-content-between align-items-center w-100 cursor-pointer sidebar-link" onClick={showSubmenu} >
          <div className="d-flex align-items-center">
          <i class="fas fa-box-open icon-color text-white pr-3"></i>
            <a className="text-white pr-2">Productos</a>
          </div>
          <div>
            {showOptions ? <i className="fas fa-chevron-down text-white"></i> : <i className="fas fa-chevron-right ml-auto text-white"></i>}
          </div>
        </div>
        <div className={showOptions ? showDetail : hidden}>
          <div className="d-flex align-items-center sidebar-font-color">
            <Link className="m-2 d-block b-bottom cursor-pointer" to="/dashboard/products">Lista de productos</Link>
          </div>
          <div className="d-flex align-items-center sidebar-font-color">
            <Link className="m-2 d-block b-bottom cursor-pointer" to="/dashboard/add-product">Agregar productos</Link>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center w-100 cursor-pointer sidebar-link" onClick={showUserSubmenu}>
          <div className="d-flex align-items-center">
            <i className="fas fa-user-friends text-white pr-3"></i>
            <a className="text-white pr-2">Usuarios</a>
          </div>
          <div>
            {showUsersOptions ? <i className="fas fa-chevron-down text-white"></i> : <i className="fas fa-chevron-right ml-auto text-white"></i>}
          </div>
        </div>
        <div className={showUsersOptions ? showDetail : hidden}>
          <div className="d-flex align-items-center sidebar-font-color">
            <Link className="m-2 d-block b-bottom cursor-pointer" to="/dashboard/users">Usuarios</Link>
          </div>
          <div className="d-flex align-items-center sidebar-font-color">
            <Link className="m-2 d-block b-bottom cursor-pointer" to="/dashboard/add-users">Agregar usuarios</Link>
          </div>
        </div>

       {/* division */}

        <div className="d-flex justify-content-between align-items-center w-100 cursor-pointer sidebar-link" onClick={showProviderSubmenu}>
          <div className="d-flex align-items-center">
          <i class="fas fa-truck text-white pr-3"></i>
            <a className="text-white pr-2">Proveedores</a>
          </div>
          <div>
            {showProviderOptions ? <i className="fas fa-chevron-down text-white"></i> : <i className="fas fa-chevron-right ml-auto text-white"></i>}
          </div>
        </div>
        <div className={showProviderOptions ? showDetail : hidden}>
          <div className="d-flex align-items-center sidebar-font-color">
            <Link className="m-2 d-block b-bottom cursor-pointer" to="/dashboard/provider-list">Lista de proveedores</Link>
          </div>
          <div className="d-flex align-items-center sidebar-font-color">
            <Link className="m-2 d-block b-bottom cursor-pointer" to="/dashboard/add-users">Mis pedidos</Link>
          </div>
        </div>

      </nav>
    </>
  )
}

export default Sidebar;
