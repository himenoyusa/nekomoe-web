import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import mainRouter from './mainRouter';
import 'antd/dist/antd.css';

const App = () => (
  <HashRouter>
    <Switch>
      {mainRouter.map((each) => (
        <Route path={each.path} component={each.component} key={each.path} />
      ))}
    </Switch>
  </HashRouter>
);

ReactDOM.render(<App />, document.getElementById('app'));
