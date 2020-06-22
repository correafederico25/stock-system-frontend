import React from 'react';
import { Route, Redirect } from 'react-router-dom';




 function isAuth(token) {
      
        
     if(localStorage.getItem('hasToken') !== null){
         return true
     }
     return false
}

 function PrivateRoute({component: Component, ...rest}) {

    return (
        <Route 
            {...rest}
            render={props => 
            isAuth() ? (
                <Component {...props} />
            ): (
                <Redirect 
                    to={{
                        pathname: '/',
                        state: { message: 'Usuario no autorizado' }
                    }}
                />
            )}
        />
    );
}

export default PrivateRoute;
