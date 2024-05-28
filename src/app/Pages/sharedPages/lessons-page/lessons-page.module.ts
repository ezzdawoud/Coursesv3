import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LessonsPageRoutingModule } from './lessons-page-routing.module';
import { LessonsPageComponent } from './lessons-page.component';
import { MyPipePipe } from 'src/app/my-pipe.pipe';


@NgModule({
  declarations: [
    LessonsPageComponent,
     MyPipePipe
  ],
  imports: [
    CommonModule,
    LessonsPageRoutingModule,
  ],
  
  
})
export class LessonsPageModule { }
