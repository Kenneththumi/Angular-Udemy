import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService{
    private ingredients:Ingredient[] =  [
        new Ingredient('Onions', 6 ),
        new Ingredient('Garlic', 12)
   ];

   getIngredients(){
    //    return this.ingredients.slice();
    return this.ingredients;
   }

   //add ingredients
   addIngredient(name, amount){
    this.ingredients.push(
      
        new Ingredient(name, amount)
      
    )
}
}