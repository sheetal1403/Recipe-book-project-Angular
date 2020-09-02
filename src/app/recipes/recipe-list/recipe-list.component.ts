import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  // @Output() recipeWasSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [];

  constructor(private recipesService: RecipesService, private dataStorageService: DataStorageService) { }

  ngOnInit(): void {

    this.recipesService.recipesChanged.subscribe(
      recipes => {
        this.recipes = recipes;
        console.log(this.recipes);
      }
    );
    // this.recipes = this.recipesService.getRecipes(); --> This is locally stored data
    this.dataStorageService.fetchRecipes();
  }

}
