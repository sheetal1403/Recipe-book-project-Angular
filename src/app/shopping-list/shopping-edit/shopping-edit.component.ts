import { Component, OnInit, Output, ViewChild, EventEmitter, ElementRef, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AppModule } from 'src/app/app.module';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @Output() addClicked = new EventEmitter<Ingredient>(); -- Not required

  // @ViewChild('nameInput') nameInputRef: ElementRef;
  // @ViewChild('amountInput') amountInputRef: ElementRef;

  @ViewChild('f') signupForm: NgForm;
  ingredients: Ingredient[];
  subscription: Subscription;
  editedIngred: Ingredient;
  editMode = false;
  editedItemIndex: number;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    // this.shoppingListService.loadToForm.subscribe(
    //   (ingredient) => {
    //     this.signupForm.setValue({
    //       iname: ingredient.name,
    //       amount: ingredient.amount
    //     })

         
    //   }
    // );

    this.ingredients = this.shoppingListService.ingredients;

    this.subscription = this.shoppingListService.editingStart.subscribe(
      (index) => {
        // this.shoppingListService.loadToForm.next(this.ingredients[index]);
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedIngred = this.shoppingListService.getIngrediant(index);
        this.signupForm.setValue({
          name: this.editedIngred.name,
          amount: this.editedIngred.amount
        })
      }
    );


  }

  onSubmit(form: NgForm){
    console.log(form);
    if(!this.editMode){
      const newIngredient = this.signupForm.value
      console.log(this.signupForm.value);
      console.log(newIngredient);
      // const ingName = this.signupForm.value.iname;

      // const ingAmount = this.signupForm.value.amount;
      // const newIngred = new Ingredient(ingName, ingAmount);
      this.shoppingListService.addItems(newIngredient);

    
    }else{
      this.editedIngred = this.signupForm.value;      
      this.shoppingListService.updateIngredient(this.editedItemIndex, this.editedIngred);
      
      // const ingName = this.signupForm.value.iname;
      // const ingAmount = this.signupForm.value.amount;
      // this.editedIngred.name = ingName;
      // this.editedIngred.amount = ingAmount;
      // this.ingredients.splice(this.editedItemIndex, 1, this.editedIngred);
    }
    this.editMode = false;
    this.signupForm.reset();
   
    
  }

  onDelete(){
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.signupForm.reset();
    this.editMode = false;
  }

  onClear(){
    this.signupForm.setValue({
      name:'',
      amount:null
    });
  
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }


}
