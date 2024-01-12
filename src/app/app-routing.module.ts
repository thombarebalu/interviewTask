import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReacfromComponent } from './reacfrom/reacfrom.component';

const routes: Routes = [
  {path:'',component:ReacfromComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
