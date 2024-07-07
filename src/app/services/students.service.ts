import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  getStudentById(id: any): Observable<any> {
    let url = `${this.apiUrl}/estudiantes/${id}`;
    return this.http.get(url);
  }

  getStudentsByCourse(nrc: any): Observable<any> {
    let url = `${this.apiUrl}/estudiantes/nrc/${nrc}`;
    return this.http.get(url);
  }

  addStudent(payload: any): Observable<any> {
    let url = `${this.apiUrl}/estudiantes`
    return this.http.post(url, payload);
  }

  deleteStudent(id: any): Observable<any> {
    let url = `${this.apiUrl}/estudiantes/${id}`;
    return this.http.delete(url);
  }
}
