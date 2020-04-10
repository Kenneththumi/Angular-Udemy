import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../../recipes.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
     @Input() recipe:Recipe ;

   // @Output() recipeSelect = new EventEmitter<Recipe>();
    
    constructor(private recipeInstance:RecipeService) { }

    ngOnInit() {
    }

    recipeSelected(recipe:Recipe){
        //this.recipeSelect.emit(recipe);
        this.recipeInstance.recipeSelected.emit(recipe);
    }

}
