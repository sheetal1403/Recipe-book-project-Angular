import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
  
})
export class ShoppingListComponent implements OnInit {


  ingredients: Ingredient[] = [];
  
  
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.ingredients;
   
    
  }

  onEditItem(i: number){
    this.shoppingListService.editingStart.next(i);
    // this.ingredients.splice(i,1);
    

  }

  

  



}
