import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Customers from './components/customers/customers'
import { Header } from "./components/header"

class App extends Component {
  render() {
    return (
        <div className="App">
            <Header className="header"></Header>
          <header className="App-header">
              <Customers />
          </header>
        </div>
    );
  }
}
export default App;
