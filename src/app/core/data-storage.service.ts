import { Injectable } from '@angular/core';
import { BaseUrl } from '../shared/base-url.service';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipe/recipes/recipe.model';
import { RecipeService } from '../recipe/recipes/recipe.service';
import { map, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

const routes ={

}

@Injectable({
  providedIn: 'root'
})
export class DataStorageService extends BaseUrl{

  constructor(private http: HttpClient,
              private recipeService : RecipeService,
                private authService : AuthService) {
    super();
  }

  storeRecipies(){
    const recipes = this.recipeService.getRecipes()
    return this.http.put<Recipe>(`${this.baseUrl}/recipe.json`, recipes)
    .subscribe((res) =>{
      // console.log(res)
    })
  }

  fetchData(){
    
   return this.http.get<Recipe[]>(`${this.baseUrl}/recipe.json`)
    .pipe(
      map(recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }), tap(
        recipes =>{
          this.recipeService.setRecipes(recipes)

        }
      )
    )
    
  }
}
