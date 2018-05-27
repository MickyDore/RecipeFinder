import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

//had to import these theme
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Root from './Components/Containers/Root';
const muiTheme = getMuiTheme({});


class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider muiTheme={muiTheme}> {/*theme inserted here*/}
          <Root />
          
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
