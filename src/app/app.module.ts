import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InventoryViewComponent } from './inventory-view/inventory-view.component';
import { materialImports } from './material.imports';

@NgModule({
  declarations: [
    AppComponent,
    InventoryViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ...materialImports
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
