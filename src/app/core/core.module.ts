import { NgModule } from "@angular/core";
import { ShoppingListService } from "../shopping/shopping-list/shopping-list.service";
import { RecipeService } from "../recipe/recipes/recipe.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "../auth/auth.interceptor";

@NgModule({
    providers:[
        ShoppingListService,
        RecipeService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass:AuthInterceptor,
            multi: true
        }
    ],
    declarations:[]
})

export class CoreModule{}