import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
   activatedSub : Subscription

  constructor(private slService: ShoppingListService,
   ) { }
    
    ngOnInit() {
      this.ingredients = this.slService.getIngredients();
     this.activatedSub = this.slService.ingredientsChanged
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        } 
        );

        
      }

      onEdit(index:number){
        this.slService.edit.next(index)
      }
      
      ngOnDestroy(): void {
        this.activatedSub.unsubscribe()
      }

}
