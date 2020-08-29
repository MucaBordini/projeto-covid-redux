import React from 'react';
import CovidList from './features/covid/CovidList'
import Header from './features/header/Header'

function App() {
  return (
    <div className="App">
      <Header />
      <CovidList />
    </div>
  );
}

export default App;
