import React, { Component } from 'react';
import '../Styles/Layout.css';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import Content from '../Content';

class Root extends Component {

  constructor() {
    super();

    this.state = {
      recipes: [],
      ingredients: []
    }
  }

  findRecipes = (ingredients) => {
    this.setState({
      ingredients: ingredients
    })

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

    return fetch('/api/search', requestOptions)
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
      console.log(recipes)
      return recipes;
    })
    .catch((error) => {
      console.log("Failed to fetch");
      alert("Error: Failed to get recipes!");
      // return Promise.reject(Error("error"));
    });
  }

//passing ingredients from the state here for use in the content component

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
            ingredients={this.state.ingredients}
          />
        </div>
      </div>
    );
  }
}

export default Root;
