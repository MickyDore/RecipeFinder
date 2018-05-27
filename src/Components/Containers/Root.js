import React, { Component } from 'react';
import '../Styles/Layout.css';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import Content from '../Content';

class Root extends Component {

  constructor() {
    super();

    this.state = {
      recipes: []
    }
  }

  findRecipes = (ingredients) => {

    var form = new URLSearchParams();
    form.append("key", "bed95d03540f2640257f0c8b892bdad3");
    form.append("q", ingredients);

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
      },
      body:form
    };

    return fetch('http://food2fork.com/api/search', requestOptions)
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(Error("error"));
      }
      return response.json();
    })
    .then((recipes) => {
      this.setState({
        recipes: recipes.recipes
      })
      return recipes;
    })
    .catch((error) => {
      console.log("Failed to fetch");
      return Promise.reject(Error("error"));
    });
  }


  render() {

    return (
      <div className="overallContainer">
        <Navbar />
        <div className="infoContainer">
          <Sidebar
            findRecipes={this.findRecipes}
          />
          <Content
            recipes={this.state.recipes}
          />
        </div>
      </div>
    );
  }
}

export default Root;
