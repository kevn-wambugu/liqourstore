import React from 'react';
import {Provider} from "react-redux"
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import './css/style.css';
import 'animate.css';
import './css/flaticon.css';
import './css/magnific-popup.css';
import store from './store';
import 'owl.carousel';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

ReactDOM.render(
  <Provider store = {store}> 
  <App/> 
  </Provider>,document.getElementById("root") 
);
 