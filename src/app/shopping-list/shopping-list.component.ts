import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})

export class ShoppingListComponent implements OnInit {
   ingredients:Ingredient[];

  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit() {
          this.ingredients = this.shoppingListService.getIngredients();
  }


  editIngredient(e){
       this.shoppingListService.editIngredientEvent.next(e);   //emit event with index
  }



}






//   getAddedIngredient(e){
//        this.ingredients.push(
         
//            new Ingredient(e.s, e.n)
         
//        )
//   }
