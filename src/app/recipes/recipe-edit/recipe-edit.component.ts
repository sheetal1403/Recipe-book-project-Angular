import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../recipes.service'
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id:number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipesService,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    )
  }

  private initForm(){
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);  

    if(this.editMode){
      
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if(recipe['ingredients']){
        for(let ingredient of recipe.ingredients){
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name),
              'amount': new FormControl(ingredient.amount)
            })
          )
          
        }
      }

    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'imagePath': new FormControl(recipeImagePath),
      'description': new FormControl(recipeDescription),
      'ingredients': recipeIngredients
    });

    
  }

  onSubmit(){
    console.log(this.recipeForm);
    
    if(this.editMode){
      this.recipeService.updateRecipe(this.id,this.recipeForm.value )
    }else{
      this.recipeService.addNewRecipe(this.recipeForm.value)
    }
   
    this.router.navigate(['../'], {relativeTo: this.route});

  }

  getControls(){
    return (<FormArray>this.recipeForm.get('ingredients')).controls
  }

  onAddIngred(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name':new FormControl(),
        'amount':new FormControl()
      })
    );
  }

  onDeleteIngred(ingredId: number){
    this.recipeService.deleteIngred(this.id, ingredId );
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(ingredId);

  }

}
