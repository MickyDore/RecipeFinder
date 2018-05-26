import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Root from './Components/Containers/Root';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
          <Root />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
