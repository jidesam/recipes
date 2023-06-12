import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number
  editMode = false
  recipeForm:FormGroup

  constructor(private route: ActivatedRoute,
                private recipeService : RecipeService,
                private router : Router) { }

  ngOnInit(): void {

    this.route.params
    .subscribe(
      (params: Params) =>{
      this.id = +params['id']
      this.editMode = params['id'] != null
      console.log(this.editMode)
      this.initForm()
    }
    )
  }

  initForm(){


    let recipeName ='';
    let imagePath ='';
    let recipeDesctiption ='';
    let recipeIngredients = new FormArray([])

    if(this.editMode){
    const recipe =   this.recipeService.getRecipeById(this.id)
    recipeName =recipe.name;
    imagePath = recipe.imagePath,
    recipeDesctiption = recipe.description

      if(recipe['ingredients']){
       for (let ingredient of recipe.ingredients){
        recipeIngredients.push(
        new FormGroup({
          
          
        'name' : new FormControl(ingredient.name, Validators.required),
        'amount':  new FormControl(ingredient.amount, [Validators.required,]
           )
        })
        )
       }
      }

    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(imagePath, Validators.required),
      'description': new FormControl(recipeDesctiption, Validators.required),
      'ingredients' :recipeIngredients


     

    })

  }

 get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient(){
   (<FormArray>this.recipeForm.get('ingredients')).push(
    new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required])
    })
   )
  }



  onSubmit(){

    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']

      // ); 
    if(this.editMode){
      this.recipeService.updateRecipe(this.id, this.recipeForm.value)
    }
    else{
      this.recipeService.addRecipe(this.recipeForm.value)
    }
    this.onCancel()
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  onDelete(index :number){
   (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
  }

}
