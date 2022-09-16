import { Component, OnInit, AfterViewInit } from "@angular/core";
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

  estudiantes: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
  ) { }

  ngOnInit(): void {
    this.buildForms();
    this.getInitialData();
  }

  getInitialData() {
    this.adminService.getCourseData().subscribe(
      (res) => {
        let tree = res;
        this.nrc = tree[2].nrc;
        this.grado = tree[2].grado;
        this.curso = tree[2].curso;
        this.estudiantes = tree[2].estudiantes;
      }
    );
  }

  buildForms() {
    this.studentForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      cres: ['', Validators.required],
    });
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
    this.showForm();
    this.estudiantes.push(values);
  }
}
