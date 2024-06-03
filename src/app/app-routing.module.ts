import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestPagesComponent } from './layouts/guest-pages/guest-pages.component';
import { AdminPagesComponent } from './layouts/admin-pages/admin-pages.component';
import { TeacherPagesComponent } from './layouts/teacher-pages/teacher-pages.component';
import { UserPagesComponent } from './layouts/user-pages/user-pages.component';
import { AdminGuard } from './authentication/admin.guard';
import { LoginAuthGuard } from './authentication/login-auth.guard';
import { AuthGuard } from './authentication/auth-guard.guard';

const routes: Routes = [
  {path:"",component:GuestPagesComponent,
  children:[
  {path:"",loadChildren:()=>import('./Pages/sharedPages/home-page/home-page.module').then(m=>m.HomePageModule)},
  {path:"signin",loadChildren:()=>import('./Pages/sharedPages/singin/singin.module').then(m=>m.SinginModule),canActivate: [LoginAuthGuard]},
  {path:"CreateAccounts",loadChildren:()=>import('./Pages/guest/createaccount/createaccount.module').then(m=>m.CreateaccountModule),canActivate: [LoginAuthGuard]},
  {path:"courses",loadChildren:()=>import('./Pages/sharedPages/courses-page/courses-page.module').then(m=>m.CoursesPageModule),pathMatch: 'full' },
  {path:"course",loadChildren:()=>import('./Pages/sharedPages/course-page/course-page.module').then(m=>m.CoursePageModule)},
  {path:"Lessons/:courseId/:lessonsId",loadChildren:()=>import('./Pages/sharedPages/lessons-page/lessons-page.module').then(m=>m.LessonsPageModule)},
  {path:"changePassword/:token/:email",loadChildren:()=>import('./Pages/sharedPages/change-password/change-password.module').then(m=>m.ChangePasswordModule)},
  {path:"changeEmail",loadChildren:()=>import('./Pages/sharedPages/change-email/change-email.module').then(m=>m.ChangeEmailModule)},
  {path:"confirm-email-change",loadChildren:()=>import('./Pages/sharedPages/change-email/change-email.module').then(m=>m.ChangeEmailModule)},
  {path:"forgotPassword",loadChildren:()=>import('./Pages/sharedPages/forgot-password/forgot-password.module').then(m=>m.ForgotPasswordModule),canActivate:[LoginAuthGuard]},
  {path:"profile",loadChildren:()=>import('./Pages/sharedPages/profile/profile.module').then(m=>m.ProfileModule),canActivate: [AuthGuard]},
  {path: "confirm-email/:id/:token", loadChildren: () => import('./Pages/guest/confierm-email/confierm-email.module').then(m => m.ConfiermEmailModule)}
  ,{path: "confirm-new-email/:id/:token/:newEmail", loadChildren: () => import('./Pages/guest/confirm-email-change/confirm-email-change.module').then(m => m.ConfirmEmailChangeModule)}
  ,{path: "teacherProfile/:teacherId", loadChildren: () => import('./Pages/sharedPages/teacher-profile/teacher-profile.module').then(m => m.TeacherProfileModule)}
  ,{path: "roadMap", loadChildren: () => import('./Pages/sharedPages/road-map/road-map.module').then(m => m.RoadMapModule)}

]},

{path:"admin",component:AdminPagesComponent,children:[{
    path:"d",loadChildren:()=>import('./Pages/sharedPages/home-page/home-page.module').then(m=>m.HomePageModule)
  },
  {path:"profile",loadChildren:()=>import('./Pages/sharedPages/profile/profile.module').then(m=>m.ProfileModule)},
  {path:"",loadChildren:()=>import('./Pages/admin/admin-dashboard/admin-dashboard.module').then(m=>m.AdminDashboardModule)},

]
  ,canActivate:[AdminGuard]},
  {path:"teacher",component:TeacherPagesComponent,
  children:[{
    path:"",loadChildren:()=>import('./Pages/teacher/teacher-dashboard/teacher-dashboard.module').then(m=>m.TeacherDashboardModule)
  },
  { path: 'profile', loadChildren: () => import('./Pages/sharedPages/profile/profile.module').then(m => m.ProfileModule) }
  ,{path:"add Course",loadChildren:()=>import('./Pages/teacher/add-course/add-course.module').then(m=>m.AddCourseModule)},
  {path:"update Course/:courseId",loadChildren:()=>import('./Pages/teacher/update-course/update-course.module').then(m=>m.UpdateCourseModule)},
  {path:"add lessons/:courseId",loadChildren:()=>import('./Pages/teacher/add-lessons/add-lessons.module').then(m=>m.AddLessonsModule)},
  {path:"lessons/:courseId/:lessonsId",loadChildren:()=>import('./Pages/teacher/teacher-lessons-page/teacher-lessons-page.module').then(m=>m.TeacherLessonsPageModule)},

]},
  {path:"user",component:UserPagesComponent,
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
