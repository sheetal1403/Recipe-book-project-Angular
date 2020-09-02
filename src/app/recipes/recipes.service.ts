import { Recipe } from './recipe.model';
import { EventEmitter, Output } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class RecipesService {



  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe('TestRecipe',
               'Lorem Ipsum is simply dummyuuuuuuuuuuuuu',
               'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_1280.jpg',
               [
                 new Ingredient('apples', 4), new Ingredient('bread', 2)
               ])

              //  new Recipe('TestRecipe2',
              //  'Lorem Ipsum is simply dummy text of the printing and typesetting industryffffffffffffffffffffffffffffffffff',
              //  'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_1280.jpg',
              //  [
              //    new Ingredient('oranges',4), new Ingredient('peach',2)
              //  ])

  ];

    @Output() onRecipeSelected = new Subject<Recipe>();

    selectedRecipe: Recipe;

    getRecipes() {
      return this.recipes;
    }
    setRecipes(recipes: Recipe[]) {
      this.recipes = recipes;
      console.log(this.recipes);
      this.recipesChanged.next(this.recipes);
    }

    getRecipe(index: number) {
      return this.recipes[index];
    }
    updateRecipe(index: number, recipe: Recipe) {
      const allRecipes = this.getRecipes();
      allRecipes[index] = recipe;
    }

    addNewRecipe(recipe: Recipe) {
      const allRecipes = this.getRecipes();
      allRecipes.push(recipe);
      this.recipesChanged.next(allRecipes);
    }

    deleteRecipe(index: number) {
      const allRecipes = this.getRecipes();
      allRecipes.splice(index, 1);

    }

    deleteIngred(recipeIndex: number, ingredientIndex: number) {
      const recipe = this.getRecipe(recipeIndex);
      recipe.ingredients.splice(ingredientIndex, 1);
      console.log(recipe);
    }



      }
