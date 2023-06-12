import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeComponent } from './recipe.component';
import { AuthGuard } from '../auth/auth.guard';
import { RecipeResolverService } from '../recipe-resolver.service';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipesComponent } from './recipes/recipes.component';

const routes: Routes = [
  //  {path: '',  redirectTo:'/recipes', pathMatch: 'full'},
{path:'', component: RecipesComponent, canActivate:[AuthGuard],
 children:[

    {path: '', component:RecipesComponent },
    {path:'new', component:RecipeEditComponent},
    {path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolverService]},
    // {path:'recipe-list', component:RecipeListComponent},
    {path:':id/edit', component: RecipeEditComponent}
]},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeRoutingModule { }



