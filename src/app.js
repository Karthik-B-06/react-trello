import React from 'react';
import ReactDOM from 'react-dom';

import AppRouter from './routes/AppRouter';
import '../public/styles/styles.scss';
import { Provider } from 'react-redux'
import create from "./store/configureStore";

const store = create();

store.subscribe(()=> {
  // console.log("Action Dispatched");
  console.log("From App.js ",store.getState());
});

const app = ( 
              
              <Provider store={store}>  
                <AppRouter/>
              </Provider> 
            );

ReactDOM.render(app, document.getElementById('root'));