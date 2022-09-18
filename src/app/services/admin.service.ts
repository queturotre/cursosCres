import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class AdminService {
  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = "https://my-json-server.typicode.com";
  }

  getCourseData(): Observable<any>{
    let url = this.apiUrl + "/queturotre/cursosCres/cursos";
    return this.http.get(url);
  }
}
