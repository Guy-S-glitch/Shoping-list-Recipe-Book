import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ShoppingListService } from './services/shopping-list.service';
import { AppRoutingModule } from './routers/app-routing.Module';
import { RecipeService } from './services/recipe.service';
import { DropdownDirective } from './shared/dropdown.directive';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './components/auth/auth.component';
import { LoadingComponent } from './shared/loading-spinner/loading/loading.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { AlertComponent } from './shared/alert-message/alert/alert.component';
import { RecipesModule } from './components/recipes/recipes.module';
import { ShoppingListModule } from './components/shopping-list/shopping-list.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent, AuthComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RecipesModule,
    ShoppingListModule,
    AppRoutingModule,
    SharedModule,
  ],
  providers: [
    ShoppingListService,
    RecipeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
