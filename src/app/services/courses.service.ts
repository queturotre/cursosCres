import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/courseData';

@Injectable({
  providedIn: 'root',
})

export class CoursesService {
  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = "http://localhost:3000/api";
  }

  getCoursesData(): Observable<any>{
    let url = `${this.apiUrl}/cursos`;
    return this.http.get(url);
  }

  addCourse(payload: Course): Observable<any> {
    let url = `${this.apiUrl}/cursos`
    return this.http.post(url, payload);
  }

  deleteCourse(nrc: any): Observable<any> {
    let url = `${this.apiUrl}/cursos/${nrc}`;
    return this.http.delete(url);
  }
}
