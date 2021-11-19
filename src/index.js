import React from 'react';
import ReactDOM from 'react-dom'; 
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query' // this is needed for react-query below

import { Auth0Provider } from '@auth0/auth0-react'; // this is needed for auth0 below

const domain= process.env.REACT_APP_AUTH0_DOMAIN; // this is needed for auth0 below
const clientId= process.env.REACT_APP_AUTH0_CLIENT_ID; // this is needed for auth0 below

window.ipAddress = { ip: "http://192.168.2.128:8080" }; //  global variable because isp keeps changing ip address

const queryClient = new QueryClient() // this is needed for react-query below

ReactDOM.render(
  
  <Auth0Provider domain={domain} clientId={clientId} redirectUri={window.location.origin}> {/* this is for auth0 */}

    <QueryClientProvider client={queryClient} contextSharing={true}> {/* this is for react-query */}

      <App /> {/* this is for the app */}
    
    </QueryClientProvider>

  </Auth0Provider>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
