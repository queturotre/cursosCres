import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CreateCourseComponent } from './components/createCourse/createCourse.component';
import { CourseComponent } from './components/course/course.component';
import { CoursesComponent } from './components/courses/courses.component';

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
    CourseComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
