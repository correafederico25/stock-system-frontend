import React from 'react';
import Login from '../Pages/Login/Login';
import PrivateRoute from '../Auth';
import Dashboard from '../Pages/Dashboard/Dashboard';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import {urlFrontEnd, urlBackEnd} from '../Functions/Functions';  

function Routes() {
    var urlFront = urlFrontEnd();
    var urlBack = urlBackEnd();

    console.log("urlFront: ", urlFront);
    console.log("urlBack: ", urlBack);
    return (
        <div>
             <Router>
             <Switch>
                 <Route exact path="/" component={Login} urlFront={urlFront} urlBack={urlBack}/>
                 <PrivateRoute path="/dashboard" component={Dashboard}  urlFront={urlFront} urlBack={urlBack}/>
             </Switch>
            </Router>
        </div>
    )
}

export default Routes;
