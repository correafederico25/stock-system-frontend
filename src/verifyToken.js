import React from 'react';

function verifyToken() {
 
     if(localStorage.getItem('hasToken') !== null){
        return true
    }
    return false
}

export default verifyToken;
