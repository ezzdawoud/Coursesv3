import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontEndComponent } from './front-end/front-end.component';
import { HomeRoadComponent } from './Home/home-road.component';

const routes: Routes = [
  {path:"",component:HomeRoadComponent},
  {path:"front-end",component:FrontEndComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoadMapRoutingModule { }
