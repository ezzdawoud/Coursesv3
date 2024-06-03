import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherLessonsPageRoutingModule } from './teacher-lessons-page-routing.module';
import { TeacherLessonsPageComponent } from './teacher-lessons-page.component';
import { MyPipePipe } from 'src/app/my-pipe.pipe';


@NgModule({
  declarations: [
    TeacherLessonsPageComponent,
    MyPipePipe
  ],
  imports: [
    CommonModule,
    TeacherLessonsPageRoutingModule
  ]
})
export class TeacherLessonsPageModule { }
