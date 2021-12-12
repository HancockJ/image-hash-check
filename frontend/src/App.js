import React, {Component} from 'react';
import './App.css';
// import Customers from './components/customers/customers'
import { Header } from "./components/header"
import GetImage from "./components/imageHash/imageHash";

class App extends Component {
  render() {
    return (
        <div className="App">
            <Header className="header"></Header>
          <header className="App-header">
              <GetImage />
              {/*<Customers />*/}
          </header>
        </div>
    );
  }
}
export default App;
