import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/home/home.page';
import Detail from './pages/detail/detail.page';
import { AuthProvider } from './hooks/useAuth';

const App = () => {
  return (
    <AuthProvider>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/tweet/:id" component={Detail} />
      </Switch>
    </AuthProvider>
  );
};

export default App;
