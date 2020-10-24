import React from 'react';
import {useRoutes} from 'hookrouter';
import NotFoundPage from './pages/NotFoundPage';
import Homepage from './pages/homepage';
import './App.css'

const routes: {} = {
  '/': () => <Homepage />
}

const App: React.FC = () => {
  const routeResult = useRoutes(routes);

  return routeResult || <NotFoundPage />;
}

export default App;
