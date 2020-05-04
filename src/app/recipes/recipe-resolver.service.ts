import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from './recipes.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { RecipeService } from './recipe.service';

@Injectable({providedIn:'root'})
export class RecipeResolverService implements Resolve<Recipe[]>{
    
    constructor(private dataStorageService:DataStorageService, private recipes:RecipeService){}

    resolve( route:ActivatedRouteSnapshot, state:RouterStateSnapshot){
          let recipes = this.recipes.getRecipe();

          if(recipes.length == 0){
            return this.dataStorageService.fetchRecipes();
          }else{
              return recipes;
          }
          
    }
}