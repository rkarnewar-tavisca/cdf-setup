import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TravelerInfoScreenComponent } from './containers/traveler-info/traveler-info-screen.component';


const routes: Routes = [{ path: '', component: TravelerInfoScreenComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TravelerInfoScreenRoutingModule { }
