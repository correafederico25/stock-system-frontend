import React from 'react';
import Layout from '../../Components/Layout/Layout';

const Home = (props) => {
    return (
        <>
            <Layout>
             <h1>Bienvenido/a {props.nameUser}</h1>
             <div className="mt-4"> <h3><i class="fas fa-exclamation-triangle"></i> Página en construcción</h3></div>
             <div className="mt-4"> <h3><i class="fas fa-exclamation-triangle"></i> Ponete las pilas FEDERICO!!</h3></div>
            </Layout>
        </>
    )
}

export default Home;
