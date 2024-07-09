import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/courseData';

@Injectable({
  providedIn: 'root',
})

export class CoursesService {
  readonly apiUrl: string = "http://localhost:3000/api";

  constructor(private http: HttpClient) { }

  getCoursesData(): Observable<Course[]>{
    let url = `${this.apiUrl}/cursos`;
    return this.http.get<Course[]>(url);
  }

  addCourse(payload: Course): Observable<Course> {
    let url = `${this.apiUrl}/cursos`
    return this.http.post<Course>(url, payload);
  }

  deleteCourse(nrc: number): Observable<void> {
    let url = `${this.apiUrl}/cursos/${nrc}`;
    return this.http.delete<void>(url);
  }
}
