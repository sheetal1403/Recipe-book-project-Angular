import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipesService } from '../recipes/recipes.service';
import { Recipe } from '../recipes/recipe.model';
import { map, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({providedIn: 'root'})

export class DataStorageService{
    constructor(private http: HttpClient, 
                private recipesService: RecipesService,
                private authService: AuthService){

    }

    storeRecipes(){
        const recipes = this.recipesService.getRecipes();
        console.log(recipes);
        this.http.put('https://recipes-project-b2ca6.firebaseio.com/recipes.json', recipes)
            .subscribe(response => console.log(response));
    }

    fetchRecipes(){
        
            return this.http.get<Recipe[]>('https://recipes-project-b2ca6.firebaseio.com/recipes.json')
            .pipe(map(recipes => {
                return recipes.map(recipe => {
                    return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients: []}
                } );
            })
            )
            .subscribe(recipes => 
                {
                    
                    this.recipesService.setRecipes(recipes);
                });
    }
}