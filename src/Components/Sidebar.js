import React, { useState } from 'react';
import { Link } from "react-router-dom";

const Sidebar = () => {

    const hidden = "d-none";
    const showDetail = "bg-white p-2 d-block mt-2 w-100 border-style text-left";
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
                <div className="header-sidebar">
                    <h5 className="sidebar text-white">App Control</h5>
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
                        <i class="far fa-edit icon-xs"></i>
                        <Link className="m-2 d-block b-bottom cursor-pointer" to="/dashboard/products">Detalle de productos</Link>
                    </div>
                    <div className="d-flex align-items-center sidebar-font-color">
                        <i class="far fa-edit icon-xs"></i>
                        <Link className="m-2 d-block b-bottom cursor-pointer" to="/dashboard/add-product">Agregar productos</Link>
                    </div>
                    <div className="d-flex align-items-center sidebar-font-color cursor-pointer">
                        <i class="far fa-file icon-xs pr-icon"></i>
                        <Link className="m-2 d-block b-bottom cursor-pointer" to="/dashboard/edit-products">Editar Productos</Link>
                    </div>
                    <div className="d-flex align-items-center sidebar-font-color">
                        <i class="far fa-trash-alt icon-xs pr-icon-sidebar"></i>
                        <Link className="m-2 d-block b-bottom cursor-pointer" to="/dashboard/delete-product">Borrar productos</Link>
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
                        <i class="fas fa-user icon-xs pr-align-sidebar"></i>
                        <Link className="m-2 d-block b-bottom cursor-pointer" to="/dashboard/users">Usuarios</Link>
                    </div>
                    <div className="d-flex align-items-center sidebar-font-color">
                        <i class="fas fa-user-plus icon-xs"></i>
                        <Link className="m-2 d-block b-bottom cursor-pointer" to="/dashboard/add-users">Agregar usuarios</Link>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Sidebar;
