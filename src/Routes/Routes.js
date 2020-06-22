import React from 'react';
import Login from '../Components/Login/Login';
import PrivateRoute from '../Auth';
import Dashboard from '../Components/Dashboard/Dashboard';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
  

function Routes() {
    return (
        <div>
             <Router>
             <Switch>
                 <Route exact path="/" component={Login} />
                 <PrivateRoute path="/dashboard" component={Dashboard}/>
             </Switch>
            </Router>
        </div>
    )
}

export default Routes;
