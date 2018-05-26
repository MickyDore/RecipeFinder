import React, { Component } from 'react';
import '../Styles/Layout.css';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import Content from '../Content';

class Root extends Component {

  render() {
    return (
      <div className="overallContainer">
        <Navbar />
        <div className="infoContainer">
          <Sidebar />
          <Content />
        </div>
      </div>
    );
  }
}

export default Root;
