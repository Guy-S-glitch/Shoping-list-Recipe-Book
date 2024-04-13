import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from '../components/recipes/recipes.component';
import { shoppingListComponent } from '../components/shopping-list/shopping-list.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'recipes', component: RecipesComponent },
  { path: 'shopping-list', component: shoppingListComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class appRoute {}
