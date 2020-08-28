import React from 'react';
import CovidList from './features/covid/CovidList'
import Header from './features/header/Header'

function App() {
  return (
    <div className="App">
      <header>
        <Header />
      </header>
      <CovidList />
    </div>
  );
}

export default App;
