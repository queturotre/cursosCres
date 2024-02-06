import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import { AdminService } from "src/app/services/admin.service";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})

export class CoursesComponent implements OnInit {

  showForm: boolean = false;

  courses: any = [];
  courseData: any = {
    nrc: '',
    level: '',
    course: ''
  }

  courseForm!: FormGroup;
  i!: number;

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private route: ActivatedRoute
  ) { }

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
    this.adminService.getCourseData().subscribe(
      (resp) => {
        let tree = resp;
        tree.map((curso: any) => {
          this.courses.push(curso);
        });

        // console.log("Estos son los estudiantes del primer curso, sí?");
        // console.log(this.courses[0].estudiantes);
      }
    );
  }

  assignData() {
    this.courseData.nrc = this.courses[0].nrc;
    this.courseData.level = this.courses[0].grado;
    this.courseData.course = this.courses[0].curso;
  }

  addCourse() {
    this.courses.push(); // Hay que hacer que si el curso ya existe no se puede repetir.
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  saveCourseData(values: any) {
    this.courseForm.markAllAsTouched();
    if (this.courseForm.invalid) return;

    this.courses.push(values);
    console.log(this.courses);
    this.toggleForm();
  }
}
