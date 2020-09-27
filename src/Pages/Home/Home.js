import React from 'react';
import Layout from '../../Components/Layout/Layout';
import FadeIn from 'react-fade-in';

const Home = (props) => {
    return (
        <>
            <Layout>
                <FadeIn>
                    <h1>Bienvenido/a {props.nameUser}</h1>
                </FadeIn>
            </Layout>
        </>
    )
}

export default Home;
