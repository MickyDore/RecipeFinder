import React, { Component } from 'react';
import './Styles/Layout.css';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';



class Content extends Component {

  constructor(props) {
    super(props);


//this state is for the popover for the ingredients list
    this.state = {
      open: false,
      countExact: 0,
      countMention: 0
    };
  }



//this handles the close of the popover for ingredients
  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

//this function is to get the ingredients from the recipe id. as the foodtofork api doesnt provide them otherwise
  getRecipes = (e, recipeID) => {
    //we have to anchor the popover to the menu item here, the event will otherwise get lost in this function, and the popover will bind to the top left corner
    this.setState({
      anchorEl: e.currentTarget
    })

    //setting up the form, with the recipe id and key code
    var form = new URLSearchParams();
    form.append("key", "bed95d03540f2640257f0c8b892bdad3");
    form.append("rId", recipeID);


    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
      },
      body: form
    };

//the fetch request is different, to api/get instead
    return fetch('/api/get', requestOptions)
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(Error("error"));
      }
      return response.json();
    })
    .then((recipes) => {
      //so here is where I calculate the number of ingredient the user has to the ingredients in the recipe

      //
      //let ingredients = recipes;

      //creating two arrays for the ingredients picked and the recipes ingredients
      let ingredientsPicked = this.props.ingredients;
      let recipeIngredients = recipes.recipe.ingredients

      //as each recipe ingredient is text with cups, teaspoons etc, we must cut these to just compare the core items as strings
      var cutIngredients = [];

      //for loop to cut out the cups, teaspoons, any numbers etc
      for (var x =0; x < recipeIngredients.length; x++){
        cutIngredients.push(recipeIngredients[x].replace(/cups?|teaspoons?|tablespoons?|[0-9]|\//gi, '').trim())

      }

      //console.log(cutIngredients)

      //So I wasnt sure how to do this so i have done it both ways
      //countExact matches only exact cases, so if you type flour, it will only match exactly flour
      //the alternative is countMention, so if the user wants flour, cases such as coconut flour, or plain flour will still match
      var countExact = 0;
      var countMention =0;

            for (var i = 0; i < ingredientsPicked.length; i++){
              for (var j = 0; j < cutIngredients.length; j++){
                cutIngredients[j].trim(); //just to trim the whitespace so we can get clean matches
                ingredientsPicked[i].trim();
                if (cutIngredients[j] === ingredientsPicked[i] ){
                  countExact += 1; //exact matches
                }
                if (cutIngredients[j].includes(ingredientsPicked[i]) ){
                  countMention += 1; //mention matches
                }
              }
            }

      //console.log(countExact + '     ' + countMention)



      //then update the state to show the % matches for each (doesnt have to be percent, could be fractions)

      var exactPercent = countExact / cutIngredients.length * 100;
      var mentionPercent = countMention / cutIngredients.length * 100;

      this.setState({
        open: true,
        countExact: exactPercent,
        countMention: mentionPercent
      });
      //
      // console.log(this.props.ingredients)
      //
      // console.log(ingredients.recipe.ingredients)
    })
    .catch((error) => {
      console.log(error);
      //alert("Error: Failed to get recipes!");
      // return Promise.reject(Error("error"));
    });
  }

  render() {
    return (
      <div className="contentContainer">
        <div className="contentTitle">Recipes</div>
        <div className="contentRecipeContainer">
          {this.props.recipes.length > 0 ? this.props.recipes.map((recipe, index) => {

            return <div key={index} className="recipeSection">
              <Card >

                <CardMedia  >
                  <img src={recipe.image_url} alt={recipe.title}/>
                </CardMedia>
                <CardTitle title={recipe.title} />
                <CardActions>
                  <a>For the recipe: </a>

                  <RaisedButton href={recipe.source_url} target="_blank" label="View Recipe!" />
                  <RaisedButton label="View Ingredients!" onClick={(e) => {this.getRecipes(e, recipe.recipe_id)}}/>
                  <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={this.handleRequestClose}
                  >
                    <Menu >
                      <MenuItem primaryText="Exact matches                   " disabled={true}>{this.state.countExact}%</MenuItem>
                      <Divider/>
                      <MenuItem primaryText="Mentions                      " disabled={true}>{this.state.countMention}%</MenuItem>
                    </Menu>
                  </Popover>
                  <CardText>{recipe.social_rank}</CardText>

                </CardActions>
              </Card>



            </div>
          }) : ""}
        </div>

      </div>
    );
  }
}

export default Content;
