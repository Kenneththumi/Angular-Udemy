import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipes.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recip: Recipe;
  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit() {
  }
   
  ngAfterViewInit(){
    //console.log(this.recip);
  }

  addToShoppingList(){
    //add the ingredients to shopping list using a service
     this.recip.ingredients.forEach(element => {
          this.shoppingListService.addIngredient(element.name,element.amount);
     });
  }
    
 

}
