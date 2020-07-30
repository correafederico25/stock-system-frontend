import React, { useState } from 'react';
import Layout from '../../Components/Layout/Layout';
import Swal from 'sweetalert2';
import Input from '../../Components/Input/Input';
import TitleDashboard from '../../Components/TitleDashoard/TitleDashboard';
import Card from '../../Components/Card/Card';
import Button from '../../Components/Button/Button';
import Spinner from '../../Components/Spinner/Spinner';

const AddProduct = () => {

  const [activeSpinner, setActiveSpinner] = useState(false);
  const [salePrice, setSalePrice] = useState('');
  const [costPrice, setCostPrice] = useState('');
  const [dataEmployee, setDataEmployee] = useState({
    name: '',
    lastname: '',
    dni: '',
    email: '',
    address: '',
    dateOfAdmission: '',
    phoneNumber: '',
    password: '',
    role: '',
    state: "true",
  });

  const regExp = /^\d*(\.\d{0,2})?$/;

  const containerTypeOptions = [
    {
      label: 'Retornable',
      value: 'RETORNABLE'
    },
    {
      label: 'Descartable',
      value: 'DESCARTABLE'
    }
  ]

  const unitOfMeasurement = [
    {
      label: 'Kilogramos',
      value: 'KG'
    },
    {
      label: 'Miligramos',
      value: 'MG'
    },
    {
      label: 'Gramos',
      value: 'G'
    },
    {
      label: 'Litros',
      value: 'L'
    },
    {
      label: 'Mililitros',
      value: 'ML'
    }
  ]
    

  const formatCurrencySalePrice = (e) => {

    if (e.name === 'salePrice') {

      if (!regExp.test(e.value) && salePrice.length == 1) {
        setSalePrice('');
      }

      if (regExp.test(e.value)) {
        setSalePrice(e.value);
      }
    }
  }


  const formatCurrencyCostPrice = (e) => {

    if (e.name === 'costPrice') {

      if (!regExp.test(e.value) && costPrice.length == 1) {
        setCostPrice('');
      }

      if (regExp.test(e.value)) {
        setCostPrice(e.value);
      }
    }
  }

  const handleChangeInput = (e) => {

    formatCurrencySalePrice(e);
    formatCurrencyCostPrice(e);

    if (e.name === 'salePrice') {

      if (!regExp.test(e.value)) {
      const changeFormat = e.value.slice(0, -1);
      parseFloat(changeFormat);
        return
      }
    }

    if (e.name === 'costPrice') {

      if (!regExp.test(e.value)) {

       const changeFormat = e.value.slice(0, -1);
       parseFloat(changeFormat);
        return
      }
    }

    setDataEmployee({
      ...dataEmployee,
      [e.name]: e.value
    })
  }

  const handleClick = (e) => {

    e.preventDefault()

    console.log(dataEmployee)
  }


  return (
    <Layout>
      <form onSubmit={handleClick} noValidate>
        <TitleDashboard title={'Registrar productos'} icon={<i class="fas fa-shopping-cart"></i>} />
        <div className="container-fluid">
          <Card className="d-none d-md-block">
            <div className="row">
              <div className="col-md-6">
                <Input textLabel={"Código de barras"} isSelectInput={false} type={"number"} placeholder={"Ingresá el código de barras del producto"} name={"barCode"} handleChangeInput={handleChangeInput} />
              </div>
              <div className="col-md-6">
                <Input textLabel={"Nombre del producto"} isSelectInput={false} type={"text"} placeholder={"Ingresá el nombre del producto"} name={"productName"} handleChangeInput={handleChangeInput} />
              </div>
              <div className="col-md-6">
                <Input textLabel={"Marca"} isSelectInput={false} type={"text"} placeholder={"¿De que marca es el producto?"} name={"brand"} handleChangeInput={handleChangeInput} />
              </div>
              <div className="col-md-6">
                <Input textLabel={"Precio de venta"} isSelectInput={false} type={'text'} placeholder={"$ 00.00"} name={"salePrice"} value={salePrice} handleChangeInput={handleChangeInput} />
              </div>
              <div className="col-md-6">
                <Input textLabel={"Precio de costo"} isSelectInput={false} type={'text'} placeholder={"$ 00.00"} name={"costPrice"} value={costPrice} handleChangeInput={handleChangeInput} />
              </div>
              <div className="col-md-6">
                <Input textLabel={"Tipo de contenido"} isSelectInput={true} name={"role"} options={containerTypeOptions} handleChangeInput={handleChangeInput} />
              </div>
              <div className="col-md-6">
              <Input textLabel={"Contenido"} isSelectInput={false} type={"number"} placeholder={"Contenido del producto"} name={"unit"} handleChangeInput={handleChangeInput} />
              </div>
              <div className="col-md-6">
              <Input textLabel={"Unidad de medida"} isSelectInput={true}  name={"unitOfMeasurement"} options={unitOfMeasurement} handleChangeInput={handleChangeInput} />
              </div>
              <div className="col-md-6">
              <Input textLabel={"Descripcion (Opcional)"} isSelectInput={false} type={"text"} placeholder={"Ingrese una descripción breve"} name={"description"} handleChangeInput={handleChangeInput} />
              </div>
              <div className="col-md-6">
                <Input textLabel={"Stock"} isSelectInput={false} type={"number"} placeholder={"Ingresá el stock para este producto"} name={"stock"} handleChangeInput={handleChangeInput} />
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <Button isBlock={false}>
                {'Registrar producto'}
              </Button>
            </div>
          </Card>
        </div>
        <Spinner isVisible={activeSpinner} />
      </form>
    </Layout>
  )
}

export default AddProduct;
