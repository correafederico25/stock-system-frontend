import React from 'react';
import './SpinnerLogin.css';

const SpinnerLogin = ({isVisible}) => {
    return (
        <div>
            <div className={isVisible ? 'spinner-container' : 'd-none'}>
                <div className="lds-dual-ring-login"></div>
            </div>
        </div>
    );
}

export default SpinnerLogin;
