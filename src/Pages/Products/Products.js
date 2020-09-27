import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Layout from '../../Components/Layout/Layout';
import TitleDashboard from '../../Components/TitleDashoard/TitleDashboard';
import Swal from 'sweetalert2';
import { FormatDate } from '../../Functions/Functions';
import Spinner from '../../Components/Spinner/Spinner';
import FadeIn from 'react-fade-in';


function Products() {

  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [noProductMsg, setNoProductMsg] = useState('');


  useEffect(() => {

    getAllProducts();

  }, []);


  const getAllProducts = () => {

    setIsLoading(true);
    const hasToken = JSON.parse(localStorage.getItem('hasToken'));

    const requestAllProducts = {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'x-access-token': hasToken
      }),
    };

    fetch('http://localhost:4000/products/all-products/1', requestAllProducts)
      .then(res => res.json())
      .then(resp => {
        if(resp.errorCode === 'MA0200'){
          setProducts(resp.products);
          setIsLoading(false);
        }else{
          setProducts(resp.products);
          setNoProductMsg(resp.errorMsg);
          setIsLoading(false);
        }
      });
  }

  const handleChangeSearch = (e) => {
    setQuery(e.target.value)
  }

  const handleSearch = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const hasToken = JSON.parse(localStorage.getItem('hasToken'));
    const request = {
      method: 'POST',
      body: JSON.stringify({
        terms: query
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        'x-access-token': hasToken
      }),
    };

    fetch(`http://localhost:4000/products/search-products/1`, request)
      .then(res => res.json())
      .then(resp => {
        if(resp.errorCode === 'MA0200'){
          setProducts(resp.products);
          setIsLoading(false);
        }else{
          setProducts(resp.products);
          setNoProductMsg(resp.errorMsg);
          setIsLoading(false);
        }
      })
      .catch(
        console.warn
      )
  }

  const deleteProduct = (id) => {
    console.log(id)
    setIsLoading(true);

    const hasToken = JSON.parse(localStorage.getItem('hasToken'));
    const requestDelete = {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        'x-access-token': hasToken
      }),
    };

    fetch(`http://localhost:4000/products/delete-product/${id}`, requestDelete)
      .then(res => res.json())
      .then(resp => {
       console.log(resp)
        if (resp.errorCode === 'MA0200') {

          setIsLoading(false);
          Swal.fire({
            icon: 'success',
            title: resp.errorMsg,
            showConfirmButton: false,
            timer: 1500
          });
          getAllProducts();
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

  const allProducts = products.map(item => {

    return (
      <tr className={item.stock <= 10 ? 'bg-warning' : ''}>
        <td>{item.barCode}</td>
        <td>{item.productName}</td>
        <td>{item.brand}</td>
        <td>{item.containerType}</td>
        <td>{"$" + " " + item.costPrice}</td>
        <td>{"$" + " " + item.salePrice}</td>
        <td>{item.provider}</td>
        <td>{item.stock}</td>
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
        <TitleDashboard title={'Inventario'} icon={<i class="fas fa-users"></i>} />
        <form class="form-inline my-2 mt-lg-0 mb-lg-3" onSubmit={handleSearch}>
          <input class="form-control mr-sm-2" type="search" placeholder="Buscar producto" onChange={handleChangeSearch} />
          <button class="btn btn-outline-primary my-2 my-sm-0" type="submit">Buscar</button>
        </form>
        {allProducts.length > 0 ? <div className="table-responsive  table-hover">
          <FadeIn>
            <table className="table bg-white mt-2 border-style">
              <thead>
                <tr>
                  <th className="border-top-none" scope="col">Código</th>
                  <th className="border-top-none" scope="col">Nombre</th>
                  <th className="border-top-none" scope="col">Marca</th>
                  <th className="border-top-none" scope="col">Contenido</th>
                  <th className="border-top-none" scope="col">Precio Costo</th>
                  <th className="border-top-none" scope="col">Precio Venta</th>
                  <th className="border-top-none" scope="col">Proveedor</th>
                  <th className="border-top-none" scope="col">Stock</th>
                  <th className="border-top-none" scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {allProducts}
              </tbody>
            </table>
          </FadeIn>

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
                  <p className="lead">¿Estas seguro que querés eliminar este producto?</p>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-primary btn-app btn-width" data-dismiss="modal">Cerrar</button>
                  <button type="button" class="btn btn-primary btn-app btn-width" data-dismiss="modal" onClick={() => deleteProduct(userId)}>Confirmar</button>
                </div>
              </div>
            </div>
          </div>
        </div>

          :

          <>
          <Spinner isVisible={isLoading} />
          <table className="table bg-white mt-2 border-style">
          <thead>
            <tr>
              <th className="border-top-none" scope="col">Código</th>
              <th className="border-top-none" scope="col">Nombre</th>
              <th className="border-top-none" scope="col">Marca</th>
              <th className="border-top-none" scope="col">Contenido</th>
              <th className="border-top-none" scope="col">Precio Costo</th>
              <th className="border-top-none" scope="col">Precio Venta</th>
              <th className="border-top-none" scope="col">Proveedor</th>
              <th className="border-top-none" scope="col">Stock</th>
              <th className="border-top-none" scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {noProductMsg}
          </tbody>
        </table>
          </>
          }

      </Layout>
    </>

  )
}

export default Products;
