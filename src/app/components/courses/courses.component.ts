import { Component } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {
  courses = [
    {nrc: '1004', grado: '10', curso: '04'},
    {nrc: '1004', grado: '11', curso: '01'},
    {nrc: '1004', grado: '9', curso: '04'},
  ];
}
