import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Layout from '../../Components/Layout';


const Users = (props) => {

  const allUsers = props.user.map((item, i) => {

    return (

      <tr>
        <th scope="row">{item.name}</th>
        <td>{item.lastname}</td>
        <td>{item.email}</td>
        <td>{item.role}</td>
        <td><Link to={`/dashboard/edit-user/${item._id}`}><button className="btn btn-warning">Editar</button></Link></td>
        <td><Link to={`/dashboard/delete-user/${item._id}`}><button className="btn btn-danger">Borrar</button></Link></td>
      </tr>
    )
  })

  return (

    <Layout>
      <div>
        <div className="d-flex w-100 justify-content-center pt-4">
          <h4>Usuarios registrados</h4>
        </div>
        <div className="d-flex justify-content-start w-100 p-3">
          <div className="col-12 col-md-7 col-lg-4">
            <button className="btn btn-primary button-search">
              <i class="fas fa-search text-white"></i>
            </button>
            <input class="form-control mr-sm-2" type="search" placeholder="Buscar usuarios" aria-label="Search" />
          </div>
        </div>
        {allUsers ? <div class="table-responsive  table-hover">
          <table class="table table-bordered bg-white mt-2 border-style">
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">Email</th>
                <th scope="col">Rol</th>
                <th scope="col">Editar</th>
                <th scope="col">Borrar</th>
              </tr>
            </thead>
            <tbody>
              {allUsers}
            </tbody>
          </table>
        </div> : <div class="loader">Loading...</div>}

      </div>

    </Layout>


  )
}

export default Users;
