import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipes.model';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
      recipeForm: FormGroup;
      
      recipe:Recipe;
      id:number;
      editStatus:boolean = false;

      constructor(private route:ActivatedRoute, private recipeService:RecipeService, private router:Router) { }

      ngOnInit(): void {
            this.route.params.subscribe(
                (params:Params) => {
                      this.id = +params['id'];
                      this.editStatus = (params['id'] == null? false : true);
                      this.recipe = this.recipeService.getRecipeItem(this.id);
                      // console.log(this.recipe)

                      
                       this.initForm();
                }
            )

      }

      //Calling the form either for new or updating recipe
      initForm(){
          let recipeName = '';
          let recipeDescription = '';
          let imgPath = '';
          let recipeIngredients = new FormArray([]);

          //on edit recipe, set the values
          if(this.editStatus){
              recipeName = this.recipe.name;
              recipeDescription = this.recipe.description;
              imgPath = this.recipe.imagePath;

              if(this.recipe.ingredients){
                    this.recipe.ingredients.forEach(element => {
                         recipeIngredients.push(
                           new FormGroup(
                             {
                               'name': new FormControl(element.name, Validators.required),
                                'amount':new FormControl(element.amount ,
                                    [
                                      Validators.required,
                                     // Validators.pattern(/^[1-9]+[0+9]*$/)
                                    ]
                                  )
                             }
                           )
                            
                         )
                    });
              }
          }

          this.recipeForm = new FormGroup({
                'recipeName': new FormControl(recipeName, Validators.required),
                'recipeDescription':new FormControl(recipeDescription, Validators.required),
                'imgPath':new FormControl(imgPath , Validators.required),
                'ingredients': recipeIngredients

          })
      }

      //getter method, to get controls inside formArray
      get controls(){
          return  (<FormArray>this.recipeForm.get('ingredients')).controls;
      }

      //on add ingredient
      onAddIngredient(){
           (this.recipeForm.get('ingredients') as FormArray).push(
                new FormGroup(
                  {
                    'name': new FormControl(null, Validators.required),
                    'amount': new FormControl(null,  
                                                    [
                                                        Validators.required,
                                                       // Validators.pattern(/^[1-9]+[0+9]*$/)
                                                    ]
                    ),
                  }
                )
           );
      }

      //on delete ingredient
      onDeleteIngredient(index:number){
         //removes control    
          (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
            
         //remove from recipe if on edit mode
          if(this.editStatus){
            //this.recipeService.deleteRecipeIngredient(this.id, index);
          }

          //read at the end of the program concerning this line below
          // (<FormArray>this.recipeForm.get('ingredients')).clear();
      }

   


      //submit
      onSubmit(){
        const newRecipe = new Recipe(
          this.recipeForm.value.recipeName, 
          this.recipeForm.value.recipeDescription,
          this.recipeForm.value.imgPath,
          this.recipeForm.value.ingredients, 
          // this.recipeForm.value['recipeName'], 
          // this.recipeForm.value['recipeDescription'],
          // this.recipeForm.value['imgPath'],
          // this.recipeForm.value['ingredients'], 
        );

           if(this.editStatus){
               this.recipeService.editRecipeItem(this.id, this.recipeForm.value) ;
           }else{
               this.recipeService.addRecipeItem(newRecipe);
           }

           //display affected item
           this.router.navigate(['../'],{relativeTo:this.route});

           //this.router.navigate(['/recipes', this.id]);
      }

      //reset / cancel the form
      onCancelForm(){
          
          //this.recipeForm.reset();

          this.router.navigate(['../'],{relativeTo:this.route});
      }

}


// As of Angular 8+, there's a new way of clearing all items in a FormArray.

// (<FormArray>this.recipeForm.get('ingredients')).clear();
// The clear() method automatically loops through all registered FormControls (or FormGroups) in the FormArray and removes them.

// It's like manually creating a loop and calling removeAt() for every item.