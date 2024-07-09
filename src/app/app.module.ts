import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CreateCourseComponent } from './components/createCourse/createCourse.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CourseComponent } from "./components/courses/course/course.component";
import { CoursesService } from './services/courses.service';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';

const appRoutes: Routes = [
  {path: "home", component: AppComponent},
  {path: "courses", component: CoursesComponent}
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
    CoursesService,
    HttpClient,
  ],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})

export class AppModule { }
