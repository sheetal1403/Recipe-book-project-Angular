import { Component, OnInit} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipeItemDetails: Recipe;

  id: number

  constructor(private recipesService: RecipesService, 
              private shoppingListService: ShoppingListService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    
    this.route.params.subscribe(
      (params: Params) => {
        
        this.id = +params['id'];
        this.recipeItemDetails = this.recipesService.getRecipe(this.id);
       
      }
    );
  }





  addToShoppingList(){
    this.recipeItemDetails.ingredients.forEach(element => {
      this.shoppingListService.addItems(element);
    });
    console.log("Added to shopping list");
    
  }

  onDeleteRecipe(){
    this.recipesService.deleteRecipe(this.id);
    this.router.navigate(['../'],{relativeTo: this.route});

  }
}
