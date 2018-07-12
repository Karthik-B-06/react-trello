import React from 'react';
import ReactDOM from 'react-dom';

import Index from '../components/index';

import {BrowserRouter, Switch, Route} from 'react-router-dom';

const template = () =>( <p> Hello, World ! </p>);
const AppRouter  = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/' component={Index}/>
    </Switch>
  </BrowserRouter>
);

export default AppRouter;