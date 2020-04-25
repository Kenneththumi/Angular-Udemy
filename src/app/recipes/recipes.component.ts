import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipes.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers:[RecipeService]
})
export class RecipesComponent implements OnInit {
   //recipa:Recipe[] = [];

  constructor(private recipeInstance:RecipeService) { }

  ngOnInit() {  //Using routing now
        // this.recipeInstance.recipeSelected.subscribe(
        //     (recip:Recipe[]) => { this.recipa = recip }
        // );
  }

  // getRecipa(e){
  //     this.recipa = e;
  // }

}
