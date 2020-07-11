
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService{

    editingStart = new Subject<number>();
    loadToForm = new Subject<Ingredient>();
    ingredients: Ingredient[] = [];

    addItems(newIngred: Ingredient){
    
        this.ingredients.push(newIngred);
        console.log(this.ingredients);
      }

      getIngrediant(index: number){
        return this.ingredients[index];
      }

      updateIngredient(index: number, newIngred: Ingredient){
        this.ingredients[index] = newIngred;
      }

      deleteIngredient(index: number){
        this.ingredients.splice(index,1);
      }
}