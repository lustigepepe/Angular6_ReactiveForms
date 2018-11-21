import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TableComponent } from './table-view/table-view.component';
import { EditComponent }  from './edit-view/edit-view.component';

const routes: Routes = [
  { path: '', redirectTo: '/table', pathMatch: 'full' },
  { path: 'table', component: TableComponent },
  { path: 'edit/:id', component: EditComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes,
    //  { enableTracing: true }
      ) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
