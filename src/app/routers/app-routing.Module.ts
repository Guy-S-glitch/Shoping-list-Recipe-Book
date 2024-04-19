import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from '../components/recipes/recipes.component';
import { RecipeStartComponent } from '../components/recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from '../components/recipes/recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from '../components/recipes/recipe-detail/recipe-detail.component';
import { ShoppingListComponent } from '../components/shopping-list/shopping-list.component';
import { RecipeResolveService } from '../services/recipe-resolve.service';
import { AuthComponent } from '../components/auth/auth.component';
import { AuthGuardService } from '../guards/auth-guard.service';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    component: RecipesComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeEditComponent },
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: [RecipeResolveService],
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: [RecipeResolveService],
      },
    ],
  },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'auth', component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
