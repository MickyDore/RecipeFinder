import React, { Component } from 'react';
import './Styles/Layout.css';
import Chip from 'material-ui/Chip';
import AutoComplete from 'material-ui/AutoComplete';

class Sidebar extends Component {

  constructor() {
    super();

    this.state = {
      ingredients: ["chicken", "tortilla wrap"], //array of ingredients
      ingredientToAdd: "", //ingredient to be added to the list
      allIngredients: ["Pork", "Egg", "Edamame", "Eagle", "Noodles", "Ginger"] //to store the autocomplete ingredients
    }
  }

  //Update the state of the ingredient to be added
  //not sure we need this function anymore with the new autocomplete, but can rename the function below!
  // handleIngredientToAddChange = (e) => {
  //   this.setState({
  //     ingredientToAdd: e.target.value //user input
  //   })
  // }

  //this handles the autocomplete function - returns values in the datasource
    handleUpdateIngredient = (value) => {
      this.setState({
      ingredientToAdd: value
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
        <div className="sidebarInputSection">

          <form onSubmit={this.handleAddIngredient}>

          <AutoComplete
            hintText="Add an ingredient!"
            filter={AutoComplete.fuzzyFilter}
            dataSource={this.state.allIngredients}
            onUpdateInput={this.handleUpdateIngredient}
            searchText={this.state.ingredientToAdd}
          />

        <button className="addIngredientButton" type="submit">Add</button>
          </form>

        </div>
        <div className="sidebarTitle">Ingredients</div>

        {this.state.ingredients.length > 0 ?
        <div className="sidebarIngredientList">
          {this.state.ingredients.map((ingredient, index) => {
            return <div key={index} className="ingredientListItem">
              <Chip
                onRequestDelete={() => this.handleRemoveIngredient(ingredient)}
                style={{margin: "5px auto", backgroundColor: "#0FA3B1"}}
              >
                {ingredient}
              </Chip>
            </div>
          })}
        </div>

        : ""}
      </div>
    );
  }
}

export default Sidebar;
