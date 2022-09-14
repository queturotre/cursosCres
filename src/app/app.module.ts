import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CreateCourseComponent } from './components/createCourse/createCourse.component';
import { CourseComponent } from './components/course/course.component';
import { CoursesComponent } from './components/courses/courses.component';
import { AdminService } from './services/admin.service';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';

const appRoutes: Routes = [
  {path: "home", component: AppComponent},
  {path: "cursos", component: CoursesComponent},
  {path: "curso", component: CourseComponent},
  {path: "crearCurso", component: CreateCourseComponent},
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
  bootstrap: [AppComponent]
})
export class AppModule { }
