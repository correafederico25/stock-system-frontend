import React, { useState } from 'react';
import { Link } from "react-router-dom";

const Sidebar = () => {

    const hidden = "d-none";
    const showDetail = "p-2-rem d-block w-100 text-left";
    const [showOptions, setShowOptions] = useState(false)
    const [showUsersOptions, setShowUsersOptions] = useState(false)

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

    return (
        <>
            <nav className="navbar-nav full-height align-items-center text-center">
                <div className="header-sidebar cursor-pointer">
                  <Link to="/dashboard"><h5 className="sidebar text-white">App Control</h5></Link>
                </div>
                <div className="d-flex justify-content-start pl-4 w-100 mb-3 text-white">
                      <span>Opciones</span>
                 </div>
          
                <div className="d-flex justify-content-between align-items-center w-100 cursor-pointer sidebar-link" onClick={showSubmenu} >
                    <div className="d-flex align-items-center">
                        <i class="far fa-folder-open icon-color text-white pr-3"></i>
                        <a className="text-white pr-2">Productos</a>
                    </div>
                    <div>
                        {showOptions ? <i class="fas fa-chevron-down text-white"></i> : <i class="fas fa-chevron-right ml-auto text-white"></i>}
                    </div>
                </div>
                <div className={showOptions ? showDetail : hidden}>
                    <div className="d-flex align-items-center sidebar-font-color">
                        <Link className="m-2 d-block b-bottom cursor-pointer" to="/dashboard/products">Detalle de productos</Link>
                    </div>
                    <div className="d-flex align-items-center sidebar-font-color">
                        <Link className="m-2 d-block b-bottom cursor-pointer" to="/dashboard/add-product">Agregar productos</Link>
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-center w-100 cursor-pointer sidebar-link" onClick={showUserSubmenu}>
                    <div className="d-flex align-items-center">
                        <i class="fas fa-user-friends text-white pr-3"></i>
                        <a className="text-white pr-2">Usuarios</a>
                    </div>
                    <div>
                        {showUsersOptions ? <i class="fas fa-chevron-down text-white"></i> : <i class="fas fa-chevron-right ml-auto text-white"></i>}
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

            </nav>
        </>
    )
}

export default Sidebar;
