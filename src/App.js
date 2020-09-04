import React ,{ useState, useEffect } from 'react';
import CovidList from './features/covid/CovidList'
import Header from './features/header/Header'

function App() {
  const [logado, setLogado] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('token') !== 'undefined'){
      setLogado(true);
    } else {
      setLogado(false);
    }
  }, []);

  return (
    <div className="App">
      <Header />
      {logado ?  <CovidList /> : null}
     
    </div>
  );
}

export default App;
