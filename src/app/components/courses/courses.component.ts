import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { AdminService } from "src/app/services/admin.service";
// import { CourseData } from "src/app/models/courseData";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})

export class CoursesComponent implements OnInit {

  showForm: boolean = false;

  courses: any = [];
  estudiantes: any = [];

  courseForm!: FormGroup;
  i!: number; // Esto se usa para obtener el index de la url cursos/i

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router
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

        for(let i = 0; i < this.courses.length; i++){
          this.estudiantes.push = this.courses[i].estudiantes;
        }
        console.log("Estos son los estudiantes del primer curso, sí?");
        console.log(this.estudiantes);
      }
    );
  }

  sendToCourse(){
    this.router.navigate(['app-course', { data: this.estudiantes}]);
  }

  addCourse() {
    this.courses.push(); // Hay que hacer que si el curso ya existe no se puede repetir.
  }

  toggleForm() {
    this.showForm = !this.showForm;
    this.courseForm.reset();
  }

  saveCourseData(values: any) {
    this.courseForm.markAllAsTouched();
    if (this.courseForm.invalid) return;

    this.courses.push(values);
    console.log(this.courses);
    this.toggleForm();
  }
}
