import React, { Component } from 'react';
import './Styles/Layout.css';
import Chip from '@material-ui/core/Chip';

class Sidebar extends Component {

  constructor() {
    super();

    this.state = {
      ingredients: ["chicken", "tortilla wrap"], //array of ingredients
      ingredientToAdd: "" //ingredient to be added to the list
    }
  }

  //Update the state of the ingredient to be added
  handleIngredientToAddChange = (e) => {
    this.setState({
      ingredientToAdd: e.target.value //user input
    })
  }

  //Add the ingredient to the list when the form is submitted
  handleAddIngredient = (e) => {
    e.preventDefault(); //prevent page refresh
    let newArr = [...this.state.ingredients, this.state.ingredientToAdd] //add ingredient
    if (!(this.state.ingredients.indexOf(this.state.ingredientToAdd) > -1)) { //prevent duplicate
      this.setState({
        ingredients: newArr,
        ingredientToAdd: ""
      })
    }
  }

  //Remove the ingredient from the list
  handleRemoveIngredient = (ingredient) => {
    this.setState({
      ingredients: this.state.ingredients.filter(e => e !== ingredient)
    })
  }

  render() {
    return (
      <div className="sidebarContainer">
        <div className="sidebarTitle">Ingredients</div>
        <div className="sidebarInputSection">
          <form onSubmit={this.handleAddIngredient}>
            <input className="sidebarIngredientInput" value={this.state.ingredientToAdd} onChange={this.handleIngredientToAddChange}></input>
          <button type="submit">Add</button>
          </form>
        </div>

        {this.state.ingredients.length > 0 ?
        <div className="sidebarIngredientList">
          {this.state.ingredients.map((ingredient, index) => {
            return <div key={index} className="ingredientListItem">
              <Chip
                label={ingredient}
                onDelete={() => this.handleRemoveIngredient(ingredient)}
              />
            </div>
          })}
        </div>

        : ""}
      </div>
    );
  }
}

export default Sidebar;
