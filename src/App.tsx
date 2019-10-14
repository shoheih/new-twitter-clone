import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/home/home.page';
import Detail from './pages/detail/detail.page';

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/tweet/:id" component={Detail} />
    </Switch>
  );
};

export default App;
