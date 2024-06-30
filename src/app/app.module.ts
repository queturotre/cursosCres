import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CreateCourseComponent } from './components/createCourse/createCourse.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CourseComponent } from "./components/courses/course/course.component";
import { AdminService } from './services/admin.service';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';

const appRoutes: Routes = [
  {path: "home", component: AppComponent},
  {path: "cursos", component: CoursesComponent},
  {path: "curso/:id", component: CourseComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    CreateCourseComponent,
    CoursesComponent,
    CourseComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [
    AdminService,
    HttpClient,
  ],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})

export class AppModule { }
