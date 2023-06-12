import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  OnDestroy
} from '@angular/core';

import { Observable, Subscription } from 'rxjs';


import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription: Subscription
  editMode:boolean= false
  shoppingForm!:FormGroup
  editItemIndex : number 
  editedItem: Ingredient

  // @ViewChild('shoppingForm', {static:true}) shopForm:NgForm

  constructor(private slService: ShoppingListService,
            private fb: FormBuilder) { }

  ngOnInit() {
    this.shoppingForm = this.fb.group({
      'name':new FormControl('', Validators.required),
      'amount': new FormControl([Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$')])    })

    this.subscription =  this.slService.edit.subscribe(
        (index: number)=>{
            this.editItemIndex= index
          this.editMode = true
          this.editedItem = this.slService.getIngredient(index)
          console.log(this.editedItem)
          this.shoppingForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })
          
        }
      )
  }
  onSubmit(){}

  onAddItem() {
    const value = this.shoppingForm.value
    console.log(value)
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode){
      this.slService.updateIngredient(this.editItemIndex, newIngredient)
    }else{
      this.slService.addIngredient(newIngredient);

    }

    this.editMode = false

  }

  onClear(){
    this.shoppingForm.reset()
    this.editMode = false 
  }

  onDelete(){
    this.slService.deleteIngredient(this.editItemIndex)
  }

ngOnDestroy(): void {
  this.subscription.unsubscribe()
}

}
