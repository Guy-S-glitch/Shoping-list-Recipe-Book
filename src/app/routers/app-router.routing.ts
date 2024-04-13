import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from '../components/recipes/recipes.component';
import { shoppingListComponent } from '../components/shopping-list/shopping-list.component';
import { NgModule } from '@angular/core';
import { RecipeStartComponent } from '../components/recipes/recipe-start/recipe-start.component';
import { RecipeDetailComponent } from '../components/recipes/recipe-detail/recipe-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    component: RecipesComponent,
    children: [
      { path: '', component: RecipeStartComponent },
      { path: ':id', component: RecipeDetailComponent },
    ],
  },
  { path: 'shopping-list', component: shoppingListComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class appRoute {}
