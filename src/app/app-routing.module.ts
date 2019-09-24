import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventoryViewComponent } from './inventory-view/inventory-view.component';
import { EditComponentComponent } from './edit-component/edit-component.component';


const routes: Routes = [
  {path: 'add', component: EditComponentComponent},
  {path: '', component: InventoryViewComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
