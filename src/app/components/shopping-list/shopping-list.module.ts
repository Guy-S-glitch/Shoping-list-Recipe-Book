import { NgModule } from '@angular/core';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { shoppingListRouting } from './shopping-list.routing';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    shoppingListRouting,
  ],
  declarations: [ShoppingListComponent, ShoppingEditComponent],
})
export class ShoppingListModule {}
