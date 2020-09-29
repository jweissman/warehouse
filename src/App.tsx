import React from 'react';
import './App.css';
import { Inventory } from './components/Inventory';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Warehouse Inventory
        </p>
      </header>
      <main>
        <Inventory />
      </main>
    </div>
  );
}

export default App;
