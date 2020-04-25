import { Component, OnInit, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
      //subject subscription   
      subjectSubscription:Subscription; 

     //@Output() ingredient= new EventEmitter<{s:string,n:number}>();
      @ViewChild('f') ingredientForm: NgForm;


      ingredientname:string ='';
      amount:number =0;

      //relevant variables needed during editing
      editMode:boolean = false;
      ingredientIndex:number;
      ingredientEditable:Ingredient;

      constructor(private shoppingListService:ShoppingListService) { }

      ngOnInit() {
         //get index of ingredient to edit and populate it on the form
          this.subjectSubscription = this.shoppingListService.editIngredientEvent.subscribe(
                                      (index:number) => {
                                            this.ingredientIndex = index;
                                            this.editMode = true;
                                            this.ingredientEditable = this.shoppingListService.getEditingIngredient(index);
                                            this.ingredientForm.setValue({
                                                  ingredientname: this.ingredientEditable.name,
                                                  amount: this.ingredientEditable.amount
                                            })
                                      }
                      )
      }



      onSubmit(){
          this.ingredientname = this.ingredientForm.value.ingredientname;
          this.amount = this.ingredientForm.value.amount;

          //if editing
          if(this.editMode){
             this.shoppingListService.editIngredient(this.ingredientIndex,this.ingredientname,this.amount);
             //reset edit mode to false
             this.editMode = false;
          }else{
            //When just adding
            this.shoppingListService.addIngredient(this.ingredientname, this.amount);
          }

          //clear form
          this.ingredientForm.reset();
          
      }

     //Delete an ingredient
     onDeleteIngredient(){
           this.shoppingListService.deleteIngredient(this.ingredientIndex);

           //reset form
           this.onResetForm();
      }


      //Reset the form
      onResetForm(){
           //clear form
           this.ingredientForm.reset();

           //ensure edit mode  false
           this.editMode = false;
      }
















      //destroy subscription, quite important for performance
      ngOnDestroy(){
          this.subjectSubscription.unsubscribe();
      }

}



// addIngredient(e){
//   e.preventDefault();

//   if(this.ingredientname ==='' || this.amount === 0){
//       this.error = true;
//   }else{
//     this.error = false;
    
//       this.shoppingListService.addIngredient(this.ingredientname, this.amount);
//       // this.ingredient.emit({ 
//       //     s: this.ingredientname,
//       //     n: this.amount
//       //   }
//       // );
//   } 
// }
