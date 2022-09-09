import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getCourse(): Observable<any>{
    let url = this.apiUrl + '/courses';
    return this.http.get(url)
  }

}
// addCourse(payload: any): Observable<any>{
//   let url = '192.65.23.45' + '/course-request';
//   return this.http.get(url, payload)
// }

// getStudent(): Observable<any>{
//   let url = '192.65.23.45' + '/students';
//   return this.http.get(url)
// }

// addStudent(payload: any): Observable<any>{
//   let url = '192.65.23.45' + '/student-request';
//   return this.http.get(url, payload)
// }