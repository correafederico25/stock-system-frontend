import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Sidebar from '../../Components/Sidebar/Sidebar';
import Navbar from '../../Components/Navbar/Navbar';
import Products from '../Products/Products';
import AddProduct from '../AddProduct/AddProduct';
import EditProducts from '../EditProducts/EditProducts';
import DeleteProduct from '../DeleteProduct/DeleteProduct';
import Users from '../Users/Users';
import AddUsers from '../AddUsers/AddUsers';
import EditUsers from '../EditUsers/EditUsers';
import Home from '../Home/Home';
import ProviderList from '../ProviderList/ProviderList';

const Dashboard = (props) => {
  
  const [userInformation, setUserinformation] = useState({});

  console.log(props.urlFront);
  console.log(props.urlBack);

  useEffect(() => {

    const hasToken = JSON.parse(localStorage.getItem('hasToken'));

    const requestInfo = {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'x-access-token': hasToken
      }),
    };

    fetch(props.urlBack + "auth/user-information", requestInfo)
      .then(res => res.json())
      .then(
        (resp) => {
          if (resp.errorCode === 'MA0200') {
            setUserinformation(resp.dataUser)
          } else {
            props.history.push("/")
          }
        },
        (error) => {
          console.log(error)
        }
      )

  },[]);


  const logOut = () => {
    localStorage.clear();
    props.history.push("/")
  }

  return (
    <React.Fragment>
      <Router>
        <div className="container-fluid p-0">
          <div className="d-flex">
            <div className="p-0 bg-sidebar sidebar-size hidden-sidebar">
            <Sidebar></Sidebar>
            </div>
            <div className="w-100 p-0 bg-light">
            <Navbar userInfo={userInformation} logOut={logOut}></Navbar>
              <div className="container-fluid full-height-sm">
                <div className="row">
                  <div className="col-12">
                    <Switch>
                      <Route path="/dashboard/add-users">
                        <AddUsers />
                      </Route>
                      <Route path="/dashboard/users">
                        <Users  />
                      </Route>
                      <Route path="/dashboard/edit-user/:id">
                        <EditUsers />
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
                      <Route path="/dashboard/provider-list">
                        <ProviderList />
                      </Route>
                      <Route path="/dashboard/products">
                        <Products />
                      </Route>
                      <Route path="/">
                        <Home nameUser={userInformation.name} />
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


