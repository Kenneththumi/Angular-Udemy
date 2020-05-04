import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators'

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipes.model';
import { Observable } from 'rxjs';

@Injectable({providedIn:'root'})
export class DataStorageService{
    constructor(private http:HttpClient, private recipeService:RecipeService){}

    saveRecipes(){
        let recipess = this.recipeService.getRecipe();

        this.http.put(
                        "https://ng-angular-recipe-project.firebaseio.com/recipes.json", 
                         recipess
                    ).subscribe(
                        response => console.log(response)
                    )
    }

    fetchRecipes(){
      return  this.http.get<Recipe[]>(
            "https://ng-angular-recipe-project.firebaseio.com/recipes.json",
        ).pipe(   //if a recipe has no ingredient property, add empty one,--avoids app breakage in future
            map(
                recipes => {
                    //  recipes.forEach(element => {
                    //       if(element.ingredients == null){
                    //          // element.ingredients = []
                    //       }
                    //  });
                      
                    //  return recipes;

                    return   recipes.map(
                                    recipe=>{
                                        return {...recipe, ingredients:recipe.ingredients?recipe.ingredients:[]}
                                    }     
                            )
                     
                }
            ), tap( 
                recipes => {
                    console.log(recipes)
    
                    this.recipeService.setRecipes(recipes)
                }
            )
        )
        // .subscribe(
           
        // )
    }
}