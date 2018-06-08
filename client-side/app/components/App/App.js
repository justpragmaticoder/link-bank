/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';

import Tables from 'components/Tables/Tables';
import NotFoundPage from 'components/NotFoundPage/Loadable';


import './style.scss';

const App = () => (
  <div className="app-wrapper">

    <Switch>
      <Route exact path="/" component={Tables} />
      <Route path="" component={NotFoundPage} />
    </Switch>
  </div>
);

export default App;
