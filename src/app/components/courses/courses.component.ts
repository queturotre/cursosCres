import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { CoursesService } from "src/app/services/courses.service";
import { Course } from "src/app/models/courseData";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})

export class CoursesComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private coursesService: CoursesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  showForm: boolean = false;
  courseForm!: FormGroup;
  i!: number; // Esto se usa para obtener el index de la url cursos/i

  courses: Course[] = [];
  selectedCourse: Course | null = null;

  ngOnInit(): void {
    this.buildForms();
    this.getInitialData();
    this.i = this.route.snapshot.params['id'];
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
        let tree = resp;
        tree.map((course: Course) => {
          this.courses.push(course);
        });
      }
    );
  }

  addCourse(newCourse: Course) {
    this.courses.push(newCourse); // Hay que hacer que si el curso ya existe no se puede repetir.
  }

  selectCourse(course: Course){
    this.selectedCourse = course;
  }

  saveCourseData(values: any) {
    this.courseForm.markAllAsTouched();
    if (this.courseForm.invalid) return;

    this.courses.push(values);
    console.log(this.courses);
    this.toggleForm();
  }

  toggleForm() {
    this.showForm = !this.showForm;
    this.courseForm.reset();
  }
}
