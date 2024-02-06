import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AdminService } from "src/app/services/admin.service";


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
})

export class CourseComponent implements OnInit {
  showStudentFormView = false;
  nrc = ''; grado = ''; curso = '';

  studentForm!: FormGroup;

  myCres: number = 0;

  courses: any[] = [];
  estudiantes: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.buildForms();
    this.getCoursesData();
  }

  buildForms() {
    this.studentForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      cres: ['', Validators.required],
    });
  }

  getCoursesData() {
    this.adminService.getCourseData().subscribe(
      (resp) => {
        let tree = resp;
        tree.map((curso: any) => {
          this.courses.push(curso);
        });

        this.courses.map((estudiante: any) => {
          this.estudiantes.push(estudiante.estudiantes)
        });
        console.log("Estudiantes: ");
        console.log(this.estudiantes);
      }
    );

    // this.getStudentsData();
  }

  // getStudentsData() {
  //   this.adminService.getCourseData().subscribe(
  //     (resp) => {
  //       let tree = resp.estudiantes;
  //       tree.forEach((estudiante: any) => {
  //         this.estudiantes.push(estudiante);
  //       });
  //     }
  //   );
  //   console.log(this.estudiantes);
  // }

  addCre(i: any) {
    this.estudiantes[i].cres += 1;
  }

  diminishCre(i: any) {
    this.estudiantes[i].cres -= 1;
  }

  deleteStudent(i: any) {
    this.estudiantes.splice(i, 1);
  }

  showForm() {
    this.showStudentFormView = !this.showStudentFormView;
  }

  collectStudentData(values: any) {
    this.studentForm.markAllAsTouched();
    if (this.studentForm.invalid) return;

    this.showForm();
    this.estudiantes.push(values);
  }
}
