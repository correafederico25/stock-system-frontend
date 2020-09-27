import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Layout from '../../Components/Layout/Layout';
import TitleDashboard from '../../Components/TitleDashoard/TitleDashboard';
import Swal from 'sweetalert2';
import {FormatDate} from '../../Functions/Functions';
import Spinner from '../../Components/Spinner/Spinner';
import FadeIn from 'react-fade-in';



const Users = () => {

  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {

    const getAllUsers = () => {

      const hasToken = JSON.parse(localStorage.getItem('hasToken'));
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
          setUsers(resp);
        })
        .catch(error => console.log(error))
    }

    getAllUsers();

  }, []);


  const deleteUser = (id) => {

    setIsLoading(true);

    const hasToken = JSON.parse(localStorage.getItem('hasToken'));
    const requestDelete = {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        'x-access-token': hasToken
      }),
    };

    fetch(`http://localhost:4000/users/delete-user/${id}`, requestDelete)
      .then(res => res.json())
      .then(resp => {

        if (resp.errorCode) {

          const deleteUser = users.filter(item => {
            return item._id !== id
          })

          setUsers(deleteUser);
          setIsLoading(false);

          Swal.fire({
            icon: 'success',
            title: resp.errorMsg,
            showConfirmButton: false,
            timer: 1500
          });
          return
        }

        setIsLoading(false);
        Swal.fire({
          icon: 'error',
          title: '',
          text: resp.errorMsg
        })
        return
      });
  }

  const allUsers = users.map(item => {

    return (
      <tr>
        <th scope="row">{item.name}</th>
        <td>{item.lastname}</td>
        <td>{item.email}</td>
        <td>{item.phoneNumber}</td>
        <td>{item.address}</td>
        <td>{item.role === 'ADMIN_ROLE' ? 'Administrador' : 'Empleado'}</td>
        <td>{FormatDate(item.dateOfAdmission)}</td>
        <td>
          <Link className="pr-3" to={`/dashboard/edit-user/${item._id}`}><i className="fas fa-pen text-dark"></i></Link>
          <a type="button" data-toggle="modal" data-target="#exampleModalCenter" onClick={() => setUserId(item._id)}>
            <i className="fas fa-trash text-dark"></i>
          </a>
        </td>
      </tr>
    )
  });


  return (

    <>

      <Layout>
        <TitleDashboard title={'Usuario registrados'} icon={<i class="fas fa-users"></i>} />
        {allUsers.length > 0 ? <div className="table-responsive  table-hover">
          <FadeIn>
          <table className="table bg-white mt-2 border-style">
            <thead>
              <tr>
                <th className="border-top-none" scope="col">Nombre</th>
                <th className="border-top-none" scope="col">Apellico</th>
                <th className="border-top-none" scope="col">Email</th>
                <th className="border-top-none" scope="col">Contacto</th>
                <th className="border-top-none" scope="col">Dirección</th>
                <th className="border-top-none" scope="col">Rol</th>
                <th className="border-top-none" scope="col">Fecha de ingreso</th>
                <th className="border-top-none" scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {allUsers}
            </tbody>
          </table>
          </FadeIn>
          <Spinner isVisible={isLoading} />

          {/* Modal confirm delete user */}

          <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLongTitle"><i class="far fa-trash-alt pr-2"></i> Eliminar usuario</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body text-center">
                  <p className="lead">¿Estas seguro que querés eliminar este usuario?</p>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-primary btn-app btn-width" data-dismiss="modal">Cerrar</button>
                  <button type="button" class="btn btn-primary btn-app btn-width" data-dismiss="modal" onClick={() => deleteUser(userId)}>Confirmar</button>
                </div>
              </div>
            </div>
          </div>
        </div>

          : <Spinner isVisible={true} />}

      </Layout>
    </>

  )
}

export default Users;
