import { Ingredient } from '../shared/ingredient.model';
import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';

@Injectable()
export class ShoppingListService{
                editIngredientEvent = new Subject<number>()

                private ingredients:Ingredient[] =  [
                    new Ingredient('Onions', 6 ),
                    new Ingredient('Garlic', 12)
            ];

            getIngredients(){
                //    return this.ingredients.slice();
                return this.ingredients;
            }

            // get an ingredient for edting
            getEditingIngredient(index:number){
                return this.ingredients[index];
            }

            //add ingredients
            addIngredient(name:string, amount:number){
                this.ingredients.push(
                
                    new Ingredient(name, amount)
                
                )
            }

            //editing ingredient
            editIngredient(index:number, name:string, amount:number){
                this.ingredients[index] = new Ingredient(name, amount);
            }

            deleteIngredient(index:number){
                this.ingredients.splice(index,1);
            }
}