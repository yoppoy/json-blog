import React from 'react';
import {render} from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './style/index.css';
import RouterConfig from "./config/RouterConfig";

//const Uri = `${process.env.REACT_APP_API_HOST || window.location.origin}/graphql`;
//console.log(`Connecting to : ${Uri}`);

const App = () => (
    <RouterConfig/>
);

render(<App/>, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
