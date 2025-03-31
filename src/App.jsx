import React from 'react';
import { AppProvider } from './components/App/AppContext';
import AppLayout from './components/App/AppLayout';
import AppMain from './components/App/AppMain';
import './App.css';
import './styles/base.css';
import './styles/variables.css';

const App = () => (
  <AppProvider>
    <AppLayout>
      <AppMain />
    </AppLayout>
  </AppProvider>
);

export default App;