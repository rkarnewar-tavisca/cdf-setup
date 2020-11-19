import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingScreenComponent } from './containers/landing-screen/landing-screen.component';


const routes: Routes = [
  { path: '', component: LandingScreenComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingScreenRoutingModule { }
