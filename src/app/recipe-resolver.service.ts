import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe/recipes/recipe.model';
import { Observable } from 'rxjs';
import { DataStorageService } from './core/data-storage.service';
import { RecipeService } from './recipe/recipes/recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolverService implements Resolve<Recipe[]>{

  constructor(private dataStorageService : DataStorageService, 
            private recipeService: RecipeService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    const recipes = this.recipeService.getRecipes()

    if (recipes.length === 0){
      return this.dataStorageService.fetchData()
    }
   else{
    return recipes
   }
  }
}
