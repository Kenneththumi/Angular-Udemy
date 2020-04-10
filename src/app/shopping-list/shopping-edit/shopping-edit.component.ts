import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
     //@Output() ingredient= new EventEmitter<{s:string,n:number}>();

      ingredientname:string ='';
      amount:number =0;
      error:boolean = false;

      constructor(private shoppingListService:ShoppingListService) { }

      ngOnInit() {
      }


      addIngredient(e){
        e.preventDefault();

        if(this.ingredientname ==='' || this.amount === 0){
            this.error = true;
        }else{
          this.error = false;
          
            this.shoppingListService.addIngredient(this.ingredientname, this.amount);
            // this.ingredient.emit({ 
            //     s: this.ingredientname,
            //     n: this.amount
            //   }
            // );
        } 
      }

}
