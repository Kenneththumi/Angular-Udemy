import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipes.model';
import { RecipeService } from '../recipe.service';
import { Router, Routes, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  //@Output() recipeSelecta = new EventEmitter<Recipe>();
  emitRecipeSubscription:Subscription;

  recipes:Recipe[];

  constructor(private recipeService:RecipeService,
              private router:Router,
              private route:ActivatedRoute) { }

  ngOnInit() {
      this.recipes = this.recipeService.getRecipe();

      this.emitRecipeSubscription = this.recipeService.emitRecipe.subscribe(
                                    (recipes:Recipe[]) => {
                                          //console.log(recipes);
                                          this.recipes = recipes
                                    }
            );
  }

  
  // getRecipe(e){
  //    this.recipeSelecta.emit(e);
  // }

  onAddNew(){
    this.router.navigate(['new'], {relativeTo:this.route});
  }


  ngOnDestroy(){
       this.emitRecipeSubscription.unsubscribe();
  }

}
