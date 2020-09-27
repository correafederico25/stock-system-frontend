import React, { useState, useEffect } from 'react';
import Layout from '../../Components/Layout/Layout';
import Swal from 'sweetalert2';
import Input from '../../Components/Input/Input';
import TitleDashboard from '../../Components/TitleDashoard/TitleDashboard';
import Card from '../../Components/Card/Card';
import Button from '../../Components/Button/Button';
import Spinner from '../../Components/Spinner/Spinner';
import CurrencyInput from '../../Components/CurrencyInput/CurrencyInput';
import { containerTypeOptions } from '../../Options';
import { verifyDecimal } from '../../Functions/Functions';
import FadeIn from 'react-fade-in';

const AddProduct = () => {

  const [activeSpinner, setActiveSpinner] = useState(false);
  const [separator, setSeparatorDecimal] = useState(false);
  const [inputCostPrice, setInputCostPrice] = useState('');
  const [inputSalePrice, setInputSalePrice] = useState('');
  const [isDecimalCostPrice, setIsDecimalCostPrice] = useState();
  const [isDecimalSalePrice, setIsDecimalSalePrice] = useState();
  const [category, setCategory] = useState([]);
  const [providers, setProviders] = useState([]);
  const [unitOfMeasurement, setUnitOfMeasurement] = useState([]);
  const [withoutBarcode, setWithoutBarcode] = useState(false);
  const [isSelected, setIsSelected] = useState();
  const [addCategory, setAddCategory] = useState({
    label: '',
    valueSelect: ''
  });
  const [addProvider, setAddProvider] = useState({
    label: '',
    valueSelect: ''
  });
  const [addUnitOfMeasurement, setAddUnitOfMeasurement] = useState({
    label: '',
    valueSelect: ''
  });

  const [addProduct, setAddProduct] = useState({
    barCode: '',
    brand: '',
    productName: '',
    description: '',
    unitOfMeasurement: '',
    unit: '',
    containerType: '',
    salePrice: '',
    costPrice: '',
    stock: '',
    provider: '',
    category: ''
  });

  useEffect(() => {

    getAllCateogiers();
    getAllProviders();
    getAllUnitOfMeasurement();


  }, []);



  const getAllCateogiers = () => {
    const hasToken = JSON.parse(localStorage.getItem('hasToken'));

    const requestInfo = {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'x-access-token': hasToken
      }),
    };

    fetch("http://localhost:4000/categorys/all-categorys", requestInfo)
      .then(res => res.json())
      .then(
        (resp) => {
          setCategory(resp)
        },
      )
      .catch(
        console.warn
      )
  }


  const getAllProviders = () => {

    const hasToken = JSON.parse(localStorage.getItem('hasToken'));

    const requestInfo = {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'x-access-token': hasToken
      }),
    };

    fetch("http://localhost:4000/providers/all-providers", requestInfo)
      .then(res => res.json())
      .then(
        (resp) => {
          setProviders(resp)
        },
      )
      .catch(
        console.warn
      )
  }


  const getAllUnitOfMeasurement = () => {

    const hasToken = JSON.parse(localStorage.getItem('hasToken'));
    const requestInfo = {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'x-access-token': hasToken
      }),
    };


    fetch("http://localhost:4000/products/all-unit-of-measurement", requestInfo)
      .then(res => res.json())
      .then(
        (resp) => {
          setUnitOfMeasurement(resp)
        },
      )
      .catch(
        console.warn
      )
  }


  const handleChangeInput = (e) => {

    if (!e.name) {
      if (e.target.name === 'costPrice') {
        setInputCostPrice(e.target.value);
        if (verifyDecimal(e.target.value)) {
          setIsDecimalCostPrice(true);
        }

        if (!verifyDecimal(e.target.value)) {
          setIsDecimalCostPrice(false);
        }
      }
      if (e.target.name === 'salePrice') {
        setInputSalePrice(e.target.value);

        if (verifyDecimal(e.target.value)) {
          setIsDecimalSalePrice(true);
        }

        if (!verifyDecimal(e.target.value)) {
          setIsDecimalSalePrice(false);
        }

      }
      setAddProduct({
        ...addProduct,
        [e.target.name]: e.target.value
      })
      return
    }

    setAddProduct({
      ...addProduct,
      [e.name]: e.value
    });
  }

  // HandleClick envía los datos recopliados en el estado dataEmployee al backend
  const handleClick = (e) => {
    e.preventDefault()
    setActiveSpinner(true);
    if (withoutBarcode) {

      if (addProduct.brand === "" ||
        addProduct.productName === "" ||
        addProduct.description === "" ||
        addProduct.salePrice === "" ||
        addProduct.costPrice === "") {

        Swal.fire({
          icon: 'error',
          title: '',
          text: 'Por favor completa todos los datos para continuar',
        })
        setActiveSpinner(false);
      }

      return
    }

    if (
      addProduct.barCode === "" ||
      addProduct.brand === "" ||
      addProduct.productName === "" ||
      addProduct.salePrice === "" ||
      addProduct.costPrice === "") {

      Swal.fire({
        icon: 'error',
        title: '',
        text: 'Por favor completa los campos obligatorios',
      })
      setActiveSpinner(false);
      return
    }


    addProduct.costPrice = Number(inputCostPrice.slice(1));
    addProduct.salePrice = Number(inputSalePrice.slice(1));
    const hasToken = JSON.parse(localStorage.getItem('hasToken'));


    fetch("http://localhost:4000/products/add-product", {
      method: 'POST',
      body: JSON.stringify(addProduct),
      headers: new Headers({
        'Content-Type': 'application/json',
        'x-access-token': hasToken
      }),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.errorCode === 'MA0200') {
          setAddProduct({
            barCode: '',
            brand: '',
            productName: '',
            description: '',
            unitOfMeasurement: '',
            unit: '',
            containerType: '',
            salePrice: '',
            costPrice: '',
            stock: '',
            provider: '',
            category: ''
          });
          setInputCostPrice('');
          setActiveSpinner(false);
          setIsSelected(true);
          Swal.fire({
            icon: 'success',
            title: resp.errorMsg,
            showConfirmButton: true,
            timer: 1500
          });
          return
        }
        if(resp.name === 'ValidationError'){
          setActiveSpinner(false);
          Swal.fire({
            icon: 'error',
            title: '',
            text: 'El código de barra de este producto ya fue registrado',
          })
          return
        }     
      })
      .catch(error => console.log(error))
  }

  // Esta función formatea el valor del input currency precio de costo cuando el input pierde el foco
  // const handleBlurInputCostPrice = () => {

  //   setSeparatorDecimal(true);
  //   if (!inputCostPrice) {
  //     setInputCostPrice('');
  //     return
  //   }
  //   if (isDecimalCostPrice && inputCostPrice.indexOf('.') === -1) {
  //     setInputCostPrice(inputCostPrice + '.00');
  //     return;
  //   }
  //   if (!isDecimalCostPrice) {
  //     const decimal = inputCostPrice[inputCostPrice.length - 1];
  //     const getLastCharacters = inputCostPrice.slice(0, -2);
  //     const verifyDecimal = getLastCharacters.indexOf(".");

  //     if (decimal === '.') {
  //       setInputCostPrice(inputCostPrice + '.00');
  //       return
  //     }
  //     if (verifyDecimal === -1) {
  //       setInputCostPrice(inputCostPrice + '0');
  //       return
  //     }
  //     setInputCostPrice(inputCostPrice);
  //   }
  // }


  // Esta función formatea el valor del input currency precio de venta cuando el input pierde el foco
  // const handleBlurInputSalePrice = () => {

  //   setSeparatorDecimal(true);
  //   if (!inputSalePrice) {
  //     setInputSalePrice('');
  //     return
  //   }

  //   if (isDecimalSalePrice) {
  //     setInputSalePrice(inputSalePrice + '.00');
  //     return;
  //   }

  //   if (!isDecimalSalePrice) {

  //     const decimal = inputSalePrice[inputSalePrice.length - 1];
  //     const getLastCharacters = inputSalePrice.slice(0, -2);
  //     const verifyDecimal = getLastCharacters.indexOf(".");

  //     if (decimal === '.') {
  //       setInputSalePrice(inputSalePrice + '.00');
  //       return
  //     }
  //     if (verifyDecimal === -1) {
  //       setInputSalePrice(inputSalePrice + '0');
  //       return
  //     }
  //     setInputSalePrice(inputSalePrice);
  //   }
  // }

  const handleFocus = () => setSeparatorDecimal(false);

  const handleCheck = (e) => {
    setAddProduct({
      barCode: '',
      brand: addProduct.brand,
      productName: addProduct.productName,
      description: addProduct.description,
      unitOfMeasurement: addProduct.unitOfMeasurement,
      unit: addProduct.unit,
      containerType: addProduct.containerType,
      salePrice: addProduct.salePrice,
      costPrice: addProduct.costPrice,
      stock: addProduct.stock,
      provider: addProduct.provider,
    });
    if (withoutBarcode) {
      setWithoutBarcode(false)
    } else {
      setWithoutBarcode(true)
    }
  }

  const handleChangeAddCategory = (e) => {
    const { value } = e.target;
    setAddCategory({
      label: value,
      valueSelect: value
    })
  }

  const handleChangeAddProvider = (e) => {
    const { value } = e.target;
    setAddProvider({
      label: value,
      valueSelect: value
    })
  }

  const handleChangeAddUnitOfMeasurement = (e) => {
    const { value } = e.target;
    setAddUnitOfMeasurement({
      label: value,
      valueSelect: value
    })
  }


  const handleClickAddCategory = () => {

    setActiveSpinner(true);

    const hasToken = JSON.parse(localStorage.getItem('hasToken'));

    fetch("http://localhost:4000/categorys/add-category", {
      method: 'POST',
      body: JSON.stringify(addCategory),
      headers: new Headers({
        'Content-Type': 'application/json',
        'x-access-token': hasToken
      }),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp)
        if (resp.errorCode === 'MA0200') {
          getAllCateogiers();
          setActiveSpinner(false);
          setAddCategory({
            label: '',
            valueSelect: ''
          })
          Swal.fire({
            icon: 'success',
            title: resp.errorMsg,
            showConfirmButton: true,
            timer: 1500
          });
          return
        }
        if(resp.errorCode === 'MA0999'){
          setActiveSpinner(false);
          Swal.fire({
            icon: 'error',
            title: '',
            text: resp.errorMsg
          })
          return
        }
        if (resp.name === 'ValidationError') {
          setActiveSpinner(false);
          Swal.fire({
            icon: 'error',
            title: '',
            text: 'Esta categoría ya existe',
          })
          return
        }
    

      })
      .catch(error => console.log(error))
  }


  const handleClickAddProvider = () => {

    setActiveSpinner(true);

    const hasToken = JSON.parse(localStorage.getItem('hasToken'));

    fetch("http://localhost:4000/providers/add-providers", {
      method: 'POST',
      body: JSON.stringify(addProvider),
      headers: new Headers({
        'Content-Type': 'application/json',
        'x-access-token': hasToken
      }),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.errorCode === 'MA0200') {
          getAllProviders();
          setActiveSpinner(false);
          setAddProvider({
            label: '',
            valueSelect: ''
          })
          setAddProvider({
            label: '',
            valueSelect: ''
          })
          Swal.fire({
            icon: 'success',
            title: resp.errorMsg,
            showConfirmButton: true,
            timer: 1500
          });
          return
        }
        setActiveSpinner(false);
        Swal.fire({
          icon: 'error',
          title: '',
          text: 'Por favor verifique los datos ingresados e intente nuevamente',
        })
        return
      })
  }


  const handleClickAddUnitOfMeasurement = () => {

    setActiveSpinner(true);

    const hasToken = JSON.parse(localStorage.getItem('hasToken'));

    fetch("http://localhost:4000/products/add-unit-of-measurement", {
      method: 'POST',
      body: JSON.stringify(addUnitOfMeasurement),
      headers: new Headers({
        'Content-Type': 'application/json',
        'x-access-token': hasToken
      }),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.errorCode === 'MA0200') {
          getAllUnitOfMeasurement();
          setActiveSpinner(false);
          setAddUnitOfMeasurement({
            label: '',
            valueSelect: ''
          })
          setAddUnitOfMeasurement({
            label: '',
            valueSelect: ''
          })
          Swal.fire({
            icon: 'success',
            title: resp.errorMsg,
            showConfirmButton: true,
            timer: 1500
          });
          return
        }
        setActiveSpinner(false);
        Swal.fire({
          icon: 'error',
          title: '',
          text: 'Por favor verifique los datos ingresados e intente nuevamente',
        })
        return
      })
  }


  return (
    <>

      <Layout>
        <FadeIn>
          <form onSubmit={handleClick} noValidate>
            <TitleDashboard title={'Registrar productos'} icon={<i class="fas fa-shopping-cart"></i>} />
            <div className="container-fluid">
              <Card className="d-none d-md-block">
                <div className="w-100 d-flex justify-content-between align-items-center mb-3">
                  <a type="button" className="" data-toggle="modal" data-target="#exampleModalCenter">
                    <i className="fas fa-tags"></i> Añadir categoria
                   </a>
                  <a type="button" className="" data-toggle="modal" data-target="#exampleModalCenter1">
                    <i className="fas fa-truck"></i> Añadir proveedores
                 </a>
                  <a type="button" className="" data-toggle="modal" data-target="#exampleModalCenter2">
                    <i class="fas fa-weight"></i> Añadir unidad de medida
                 </a>
                  <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1" value={withoutBarcode} onClick={handleCheck} />
                    <label class="form-check-label" for="exampleCheck1">Añadir producto sin código de barras</label>
                  </div>

                </div>
                <div className="row">
                  <div className="col-md-6">
                    <Input
                      textLabel={"*Código de barras"}
                      value={addProduct.barCode}
                      isSelectInput={false}
                      type={"number"}
                      placeholder={"Ingresá el código de barras del producto"}
                      name={"barCode"}
                      handleChangeInput={handleChangeInput}
                      disabled={withoutBarcode}
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      textLabel={"*Nombre del producto"}
                      value={addProduct.productName}
                      isSelectInput={false}
                      type={"text"}
                      placeholder={"Ingrese el nombre del producto"}
                      name={"productName"}
                      handleChangeInput={handleChangeInput} />
                  </div>
                  <div className="col-md-6">
                    <Input
                      textLabel={"*Stock"}
                      value={addProduct.stock}
                      isSelectInput={false}
                      type={"number"}
                      placeholder={"Ingresá el stock para este producto"}
                      name={"stock"}
                      handleChangeInput={handleChangeInput} />
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mt-2">
                      <label className="text-labels" htmlFor="">*Precio de venta</label>
                      <CurrencyInput
                        autocomplete="off"
                        className="form-control"
                        name="salePrice"
                        placeholder={"Ingresá el precio del producto"}
                        value={inputSalePrice}
                        onChange={handleChangeInput}
                        onBlur={handleBlurInputSalePrice}
                        onFocus={handleFocus}
                        separator={separator ? ',' : ''} />
                    </div>

                  </div>
                  <div className="col-md-6">
                    <div className="form-group mt-2">
                      <label className="text-labels">*Precio de costo</label>
                      <CurrencyInput
                        autocomplete="off"
                        className="form-control"
                        name="costPrice"
                        placeholder={"Ingresá el precio del producto"}
                        value={inputCostPrice}
                        onChange={handleChangeInput}
                        onBlur={handleBlurInputCostPrice}
                        onFocus={handleFocus}
                        separator={separator ? ',' : ''} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <Input
                      textLabel={"*Marca"}
                      value={addProduct.brand}
                      isSelectInput={false}
                      type={"text"}
                      placeholder={"¿De que marca es el producto?"}
                      name={"brand"}
                      handleChangeInput={handleChangeInput} />
                  </div>
                  <div className="col-md-6">
                    <Input
                      textLabel={"Retornable / Descartable"}
                      selected={isSelected}
                      value={addProduct.containerType}
                      isSelectInput={true}
                      name={"containerType"}
                      options={containerTypeOptions}
                      handleChangeInput={handleChangeInput} />
                  </div>
                  <div className="col-md-6">
                    <Input
                      textLabel={"Categoria"}
                      selected={isSelected}
                      value={addProduct.category}
                      isSelectInput={true}
                      name={"category"}
                      options={category}
                      handleChangeInput={handleChangeInput} />
                  </div>
                  <div className="col-md-6">
                    <Input
                      textLabel={"Cont. Neto."}
                      value={addProduct.unit}
                      isSelectInput={false}
                      type={"number"}
                      placeholder={"Contenido del producto"}
                      name={"unit"}
                      handleChangeInput={handleChangeInput} />
                  </div>
                  <div className="col-md-6">
                    <Input
                      textLabel={"Unidad de medida"}
                      selected={isSelected}
                      value={addProduct.unitOfMeasurement}
                      isSelectInput={true}
                      name={"unitOfMeasurement"}
                      options={unitOfMeasurement}
                      handleChangeInput={handleChangeInput} />
                  </div>
                  <div className="col-md-6">
                    <Input
                      textLabel={"Descripción"}
                      value={addProduct.description}
                      isSelectInput={false}
                      type={"text"}
                      placeholder={"Ingrese una descripción breve"}
                      name={"description"}
                      handleChangeInput={handleChangeInput} />
                  </div>
                  <div className="col-md-6">
                    <Input
                      textLabel={"Proovedor"}
                      selected={isSelected}
                      value={addProduct.provider}
                      isSelectInput={true}
                      options={providers}
                      name={"provider"}
                      handleChangeInput={handleChangeInput} />
                  </div>
                </div>
                <div className="d-flex justify-content-center mt-4">
                  <Button isBlock={false} isLg={true}>
                    {'Registrar producto'}
                  </Button>
                </div>
              </Card>
            </div>
          </form>
        </FadeIn>
        <Spinner isVisible={activeSpinner} />
      </Layout>
      {/* 
  modal para agregar categorias
 */}

      <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Agregar categoría</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <input type="text" className="form-control" placeholder="Ingresá el nombre de la categoria" value={addCategory.valueSelect} onChange={handleChangeAddCategory} />
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-dismiss="modal">Cerrar</button>
              <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={handleClickAddCategory}>Confirmar</button>
            </div>
          </div>
        </div>
      </div>

      {/* 
  modal para agregar proveedores
 */}

      <div class="modal fade" id="exampleModalCenter1" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Agregar proveedores</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <input type="text" className="form-control" placeholder="Ingresá el nombre del proveedor" value={addProvider.valueSelect} onChange={handleChangeAddProvider} />
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-dismiss="modal">Cerrar</button>
              <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={handleClickAddProvider}>Confirmar</button>
            </div>
          </div>
        </div>
      </div>

      {/* 
  modal para agregar unidad de medida
 */}

      <div class="modal fade" id="exampleModalCenter2" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Agregar unidad de medida</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <input type="text" className="form-control" placeholder="Ej: Kilo, Gramo, Litro" value={addUnitOfMeasurement.valueSelect} onChange={handleChangeAddUnitOfMeasurement} />
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-dismiss="modal">Cerrar</button>
              <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={handleClickAddUnitOfMeasurement}>Confirmar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddProduct;











