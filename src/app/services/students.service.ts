import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/courseData';

@Injectable({
  providedIn: 'root',
})

export class StudentsService {
  readonly apiUrl: string = "http://localhost:3000/api";

  constructor(private http: HttpClient) { }

  getStudentsData(): Observable<Student[]>{
    let url = this.apiUrl + "/estudiantes";
    return this.http.get<Student[]>(url);
  }

  getStudentsByCourse(nrc: number): Observable<Student[]> {
    let url = `${this.apiUrl}/estudiantes/nrc/${nrc}`;
    return this.http.get<Student[]>(url);
  }

  addStudent(payload: Student): Observable<Student> {
    let url = `${this.apiUrl}/estudiantes`
    return this.http.post<Student>(url, payload);
  }

  updateStudent(payload: Student): Observable<any> {
    let url = `${this.apiUrl}/estudiantes/${payload.id}`;
    return this.http.put(url, payload);
  }

  deleteStudent(id: any): Observable<void> {
    let url = `${this.apiUrl}/estudiantes/${id}`;
    return this.http.delete<void>(url);
  }
}
