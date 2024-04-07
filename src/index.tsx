import { Auth0Provider } from '@auth0/auth0-react';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.render(
  <Auth0Provider
    domain="dev-lbzi5eglvzb4x2p5.us.auth0.com"
    clientId="M4s3gaHev0eyiiaEmn87CAcRSz3GPayw"
  
  >
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);

