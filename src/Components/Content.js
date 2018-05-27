import React, { Component } from 'react';
import './Styles/Layout.css';

class Content extends Component {

  render() {
    return (
      <div className="contentContainer">
        <div className="contentTitle">Recipes</div>
        <div className="contentRecipeContainer">
          {this.props.recipes.length > 0 ? this.props.recipes.map((recipe, index) => {
            return <div key={index} className="recipeSection">
              <div className="recipeSectionInfo">
                <div className="recipeSectionTitle">{recipe.title}</div>
            </div>
              <div className="recipeSectionImage">
                <img src={recipe.image_url} alt={recipe.title}/>
              </div>
            </div>
          }) : ""}
        </div>

      </div>
    );
  }
}

export default Content;
