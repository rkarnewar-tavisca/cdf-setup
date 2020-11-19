import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReviewAndPayScreenComponent } from './containers/review-and-pay-screen/review-and-pay-screen.component';

const routes: Routes = [{path: '', component: ReviewAndPayScreenComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewAndPayScreenRoutingModule { }
