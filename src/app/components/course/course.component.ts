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
    this.getInitialData();
  }

  buildForms() {
    this.studentForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      cres: ['', Validators.required],
    });
  }

  getInitialData() {
    this.adminService.getCourseData().subscribe(
      (resp) => {
        let tree = resp;
        tree.forEach((estudiante: any) => {
          this.estudiantes.push(estudiante);
        });
      }
    );
    // this.assignStudentsData();
  }

  assignStudentsData() {
    this.estudiantes.forEach((estudiante) => {
      this.estudiantes.push(estudiante);
    });
    console.log("Estos son los estudiantes ¿sí?");
    console.log(this.estudiantes);
  }

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
