import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { FormsModule } from '@angular/forms';
// import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations:[
        ShoppingListComponent,
        ShoppingEditComponent
    ],

    imports: [
        FormsModule, CommonModule,
        RouterModule.forChild([ {path:'shopping-list',component: ShoppingListComponent}])
    ],

    exports:[
        ShoppingListComponent,
        ShoppingEditComponent
    ]
})

export class ShoppingListModule{

}