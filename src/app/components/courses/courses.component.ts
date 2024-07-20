import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Course } from 'src/app/models/courseData';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})

export class CoursesComponent implements OnInit {
  createCourseForm!: FormGroup;
  formTemplate: boolean = false;
  courses: Course[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private coursesService: CoursesService
  ) { }

  ngOnInit(): void {
    this.getInitialData();
    this.buildForm();
  }

  getInitialData(): void {
    this.coursesService.getCoursesData().subscribe(
      (resp) => {
        this.courses = resp;
      }
    );
  }

  buildForm(){
    this.createCourseForm = this.formBuilder.group({
      nrc: ['', Validators.required],
      grado: ['',
        Validators.compose([
          Validators.required,
          Validators.min(1),
          Validators.max(11)
        ])
      ],
      curso: ['',Validators.required]
    })
  }

  createCourse(payload: Course){
    this.coursesService.addCourse(payload).subscribe(
      () => this.getInitialData()
    );
  }

  showForm() {
    this.formTemplate = !this.formTemplate;
    this.createCourseForm.reset();
  }

  selectCourse(course: Course): void {
    this.router.navigate(['/course-detail', course.nrc]);
  }
}
