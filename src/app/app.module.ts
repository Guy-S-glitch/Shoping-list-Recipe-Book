import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { headerComponent } from './components/header/header.component';
import { shoppingListComponent } from './components/shopping-list/shopping-list.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { RecipeDetailComponent } from './components/recipes/recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './components/recipes/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './components/recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingEditComponent } from './components/shopping-list/shopping-edit/shopping-edit.component';
import { dropdownDirective } from './shared/dropdown.directive';
import { appRoute } from './routers/app-router.routing';
import { RecipeEditComponent } from './components/recipes/recipe-edit/recipe-edit.component';
import { RecipeNewComponent } from './components/recipes/recipe-new/recipe-new.component';
import { RecipeStartComponent } from './components/recipes/recipe-start/recipe-start.component';

@NgModule({
  declarations: [
    AppComponent,
    headerComponent,

    RecipesComponent,
    RecipeDetailComponent,
    RecipeEditComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeNewComponent,
    RecipeStartComponent,

    shoppingListComponent,
    ShoppingEditComponent,
    
    dropdownDirective,
  ],
  imports: [BrowserModule, FormsModule, appRoute,ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
