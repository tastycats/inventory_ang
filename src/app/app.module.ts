import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InventoryViewComponent } from './inventory-view/inventory-view.component';
import { materialImports } from './material.imports';
import { NavbarComponent } from './navbar/navbar.component';
import { EditComponentComponent } from './edit-component/edit-component.component';
import { ItemDetailsDialogComponent } from './item-details-dialog/item-details-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    InventoryViewComponent,
    NavbarComponent,
    EditComponentComponent,
    ItemDetailsDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ...materialImports,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ItemDetailsDialogComponent, EditComponentComponent]
})
export class AppModule { }
