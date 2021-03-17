import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { debugContextDevtool } from 'react-context-devtool';
import mainRouter from './mainRouter';
import 'antd/dist/antd.css';
import './theme.scss';

const App = () => (
  <HashRouter>
    <Switch>
      {mainRouter.map((each) => (
        <Route path={each.path} component={each.component} key={each.path} />
      ))}
    </Switch>
  </HashRouter>
);

const container = document.getElementById('app');

ReactDOM.render(<App />, container);

debugContextDevtool(container, { disable: process.env.NODE_ENV === 'production' });
