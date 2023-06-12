import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";

const appRoutes: Routes= [
   
    
    { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
    { path: 'recipes', loadChildren: () => import('./recipe/recipe.module').then(m => m.RecipeModule) },
   
    { path: 'shopping-list', loadChildren: () => import('./shopping/shopping.module').then(m => m.ShoppingModule) }

]

@NgModule({
    imports:[
        RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
    ],
    exports:[
        RouterModule

    ]
})

export class AppRoutingModule{

}