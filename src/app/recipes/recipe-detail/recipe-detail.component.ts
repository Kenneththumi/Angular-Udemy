import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipes.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
   @Input() recip: Recipe;
  
   index:number;
  
  constructor(private shoppingListService:ShoppingListService,
              private route:ActivatedRoute,
              private recipeService:RecipeService,
              private router:Router) { }

  ngOnInit() {
       this.route.params.subscribe(
         (params:Params) => {
              this.index = +params['id'];
              return this.recip = this.recipeService.getRecipeItem(this.index);
         }
       )

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
    
  onClickEdit(){
    this.router.navigate(['edit'], {relativeTo:this.route})

    //this.router.navigate(['../',this.index,'edit'], {relativeTo:this.route})
  }

  //deleting Recipe
    onDeleteRecipe(){
        //delete item and refresh to recipes
         this.recipeService.deleteRecipeItem(this.index);

         this.router.navigate(['recipes']);
    }
 

}
