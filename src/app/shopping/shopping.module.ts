import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingRoutingModule } from './shopping-routing.module';
import { ShoppingComponent } from './shopping.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ShoppingComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
  ],
  imports: [
    ReactiveFormsModule,
    ShoppingRoutingModule,
    SharedModule
  ]
})
export class ShoppingModule { }
