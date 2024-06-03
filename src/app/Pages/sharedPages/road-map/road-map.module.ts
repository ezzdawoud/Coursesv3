import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoadMapRoutingModule } from './road-map-routing.module';
import { FrontEndComponent } from './front-end/front-end.component';
import { HomeRoadComponent } from './Home-road/home-road.component';


@NgModule({
  declarations: [
    FrontEndComponent,
    HomeRoadComponent
  ],
  imports: [
    CommonModule,
    RoadMapRoutingModule
  ]
})
export class RoadMapModule { }
