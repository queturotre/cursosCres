import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course, Student } from 'src/app/models/courseData';
import { CoursesService } from 'src/app/services/courses.service';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})

export class CourseDetailComponent implements OnInit {
  course: Course | null = null;
  students: Student[] = [];

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    private studentsService: StudentsService
  ) {}

  ngOnInit(): void {
    this.loadCourseDetail();
  }

  loadCourseDetail(){
    const nrc = this.route.snapshot.paramMap.get('nrc');
    if (nrc) {
      this.coursesService.getCourseByNrc(nrc).subscribe(
        (resp: any) => {
          console.log(resp);
          this.course = resp[0];
          console.log(this.course);
          this.loadStudentsDetails();
        }, (error) => {
          console.error('Error fetching course details', error);
        }
      );
    }
  }

  loadStudentsDetails(){
    const nrc = this.route.snapshot.paramMap.get('nrc');
    if (nrc){
      this.studentsService.getStudentsByCourse(parseInt(nrc)).subscribe(
        (resp) => {
          this.students = resp;
        }
      );
    }
  }
}
