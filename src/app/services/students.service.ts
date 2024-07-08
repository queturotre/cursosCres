import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/courseData';

@Injectable({
  providedIn: 'root',
})

export class StudentsService {
  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = "http://localhost:3000/api";
  }

  getStudentsData(): Observable<any>{
    let url = this.apiUrl + "/estudiantes";
    return this.http.get(url);
  }

  getStudentsByCourse(nrc: any): Observable<any> {
    let url = `${this.apiUrl}/estudiantes/nrc/${nrc}`;
    return this.http.get(url);
  }

  addStudent(payload: Student): Observable<any> {
    let url = `${this.apiUrl}/estudiantes`
    return this.http.post(url, payload);
  }

  updateStudent(payload: Student): Observable<any> {
    let url = `${this.apiUrl}/estudiantes/${payload.id}`;
    return this.http.put(url, payload);
  }

  deleteStudent(id: any): Observable<any> {
    let url = `${this.apiUrl}/estudiantes/${id}`;
    return this.http.delete(url);
  }
}
