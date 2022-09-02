import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

import store from './store'
import './index.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <Provider store={store}>
      <GoogleReCaptchaProvider
        reCaptchaKey={process.env.REACT_APP_SITE_KEY}
      >
        <App />
      </GoogleReCaptchaProvider>
    </Provider>
  
);

