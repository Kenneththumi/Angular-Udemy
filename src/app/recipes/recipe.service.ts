import { Recipe } from './recipes.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService{
    //recipeSelected = new EventEmitter<Recipe>();
     emitRecipe = new Subject<Recipe[]>();

    private recipe:Recipe[] = [];
    // [
    //     new Recipe(
    //              'Githeri', 
    //              'Githeri (Gĩtheri), also called muthere or mutheri, is a Kenyan traditional meal of maize and legumes, mostly beans of any type mixed and boiled together',
    //              'https://3.bp.blogspot.com/-gJ3x22_tPKY/VYkUAAA5CcI/AAAAAAAAAI0/bKVm0vTLqD8/s1600/githeri.jpg',
    //              [
    //                  new Ingredient('Maize', 9),
    //                  new Ingredient('Carrots', 0.2),
    //                  new Ingredient('Tomatoes', 2)
    //              ]
    //              ),
    //     new Recipe(
    //                 'Ugali', 
    //                 'Ugali (also known as ugali pap, nsima and nshima) is a type of maize flour porridge made in Africa.',
    //                 'https://3.bp.blogspot.com/-9DwNpmSD8gE/WrIdRLQhr4I/AAAAAAAAYaU/RNX6wzWHrAMiUfGQ2KbWUV6jpOPv38n-ACLcBGAs/s1600/how-to-cook-the-perfect-ugali-nairobi-kitchen-recipe-1.jpg',
    //                 [
    //                     new Ingredient('Maize', 9),
    //                     new Ingredient('Water', 1.5) 
    //                 ])
    //  ];

     setRecipes(recipes:Recipe[]){
            this.recipe = recipes;

            this.emitRecipe.next(this.recipe.slice())
     }

     getRecipe(){
         return this.recipe.slice();
     }

     getRecipeItem(index:number){
         return this.recipe[index];
     }

     //edit item
     editRecipeItem(index:number, recip){
                this.recipe[index] = new Recipe(
                                                    recip.recipeName, 
                                                    recip.recipeDescription,
                                                    recip.imgPath,
                                                    recip.ingredients, 
                                                );

           this.emitRecipe.next(this.recipe.slice())
     }

     //add item
     addRecipeItem(recip:Recipe){
           this.recipe.push(recip);

           //emits the new recipe
           this.emitRecipe.next(this.recipe.slice())
     }

     //delete recipe
     deleteRecipeItem(index:number){
          
        this.recipe.splice(index,1);
        
        //emits the new recipe
        this.emitRecipe.next(this.recipe.slice())
     }

     //delete recipe ingredient
     deleteRecipeIngredient(recipeIndex:number, ingredientIndex:number){
           this.recipe[recipeIndex].ingredients.splice(ingredientIndex,1);

           //emits the new recipe
           this.emitRecipe.next(this.recipe.slice())
     }

}