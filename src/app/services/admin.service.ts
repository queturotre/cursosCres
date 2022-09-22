import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class AdminService {
  apiUrl: string;

  constructor(private http: HttpClient) {
    // this.apiUrl = "http://localhost:3000";
    this.apiUrl = "https://my-json-server.typicode.com";
  }

  getCourseData(): Observable<any>{
    let url = this.apiUrl + "/queturotre/cursosCres/cursos";
    // let url = this.apiUrl + "/courses";
    return this.http.get(url);
  }
}
