import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { DataStorageService } from '../core/data-storage.service';
import { RecipeService } from '../recipe/recipes/recipe.service';
import { Recipe } from '../recipe/recipes/recipe.model';
import { AuthService } from '../core/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {

  storedData : any
  fetchedData : any
  userSub: Subscription
  isAuthenticated: boolean = false

  constructor(private dataStorageService: DataStorageService,
              private recipeService: RecipeService,
              private authService: AuthService){}
  ngOnInit(): void {
   this.userSub = this.authService.user.subscribe(
    user =>{
      // this.isAuthenticated = !user? false : true
      this.isAuthenticated = !!user
      
    }
   )
  }
 

  onSaveData(){
     this.dataStorageService.storeRecipies()
    
  }

  onFetchData(){
    this.dataStorageService.fetchData()
    .subscribe((res) =>{
     this.recipeService.setRecipes(res)
    })
  }

  logout(){
    this.authService.logout()
  }
  
  ngOnDestroy(): void {
      this.userSub.unsubscribe()
  }
}
