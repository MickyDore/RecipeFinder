import React, { Component } from 'react';
import './Styles/Layout.css';
import Chip from 'material-ui/Chip';
import AutoComplete from 'material-ui/AutoComplete';

class Sidebar extends Component {

  constructor() {
    super();

    this.state = {
      ingredients: ["apple", "flour"], //array of ingredients
      ingredientToAdd: "", //ingredient to be added to the list
      allIngredients: ["Pork", "Egg", "Edamame", "Eagle", "Noodles", "Ginger"],
    }
  }


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
    this.refs[`ingredientInput`].setState({searchText:''});
    this.refs[`ingredientInput`].focus();
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

<<<<<<< HEAD
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

        <div className="sidebarTitle">Ingredients</div>
=======


          <form onSubmit={this.handleAddIngredient}>


          {/*I've just popped the autocomplete function here for now*/}
          <AutoComplete
            hintText="Type anything"
            ref='ingredientInput'
            dataSource={this.state.allIngredients}
            onUpdateInput={this.handleUpdateIngredient}
            value={this.state.ingredientToAdd}
            filter={AutoComplete.fuzzyFilter}
            maxSearchResults={5}
          />

          <button type="submit">Add</button>
          </form>




        </div>
>>>>>>> 1278303739e424d55019e099c654efbec7bb8f0c

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

        : "Add some ingredients!"}
      </div>


        <div className="findRecipesSection">
          <button className="addIngredientButton" onClick={() => this.props.findRecipes(this.state.ingredients)}>Find Recipes!</button>
        </div>
      </div>
    );
  }
}

export default Sidebar;
