import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { CoursesService } from "src/app/services/courses.service";
import { StudentsService } from "src/app/services/students.service";
import { Course, Students } from "src/app/models/courseData";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})

export class CoursesComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private coursesService: CoursesService,
    private studentsService: StudentsService
  ) { }

  showForm: boolean = false;
  courseForm!: FormGroup;

  courses: Course[] = [];
  selectedCourse: Course | null = null;
  students: Students[] = [];

  ngOnInit(): void {
    this.buildForms();
    this.getInitialData();
  }

  buildForms() {
    this.courseForm = this.formBuilder.group({
      nrc: ['', Validators.required],
      grado: ['',
        Validators.compose([
          Validators.required,
          Validators.min(1),
          Validators.max(11)
        ])
      ],
      curso: ['',
        Validators.compose([
          Validators.required,
          Validators.min(1),
          Validators.max(5),
        ])
      ],
    });
  }

  getInitialData() {
    this.coursesService.getCoursesData().subscribe(
      (resp) => {
        this.courses = resp;
      }
    );
  }

  selectCourse(course: Course){
    this.selectedCourse = course;
    this.studentsService.getStudentsByCourse(course.nrc).subscribe(
      (resp) => {
        this.students = resp;
      }
    );
  }

  saveCourseData() {
    this.courseForm.markAllAsTouched();
    if (this.courseForm.invalid) return;

    const newCourse: Course = {
      nrc: this.courseForm.value.nrc,
      grado: this.courseForm.value.grado,
      curso: this.courseForm.value.curso,
    };

    this.coursesService.addCourse(newCourse).subscribe(
      (res) => {
        console.log('Course added successfully', res);
        this.toggleForm();
      },
      (err) => {
        console.error('Error al adding course', err);
      }
    );

    this.toggleForm();
  }

  toggleForm() {
    this.showForm = !this.showForm;
    this.courseForm.reset();
  }
}
