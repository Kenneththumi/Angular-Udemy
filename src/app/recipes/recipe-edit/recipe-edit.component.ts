import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipes.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipe:Recipe;
  id:number;
  editStatus:boolean = false;

  constructor(private route:ActivatedRoute, private recipeService:RecipeService) { }

  ngOnInit(): void {
        this.route.params.subscribe(
            (params:Params) => {
                  this.id = +params['id'];
                  this.editStatus = (params['id'] == null? false : true);
                  this.recipe = this.recipeService.getRecipeItem(this.id);
                  //console.log(this.editStatus)
            }
        )
  }

}
