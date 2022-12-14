import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {

  showForm: boolean = false;

  courses = [
    {
      "nrc": "1004",
      "grado": "10",
      "curso": "04",
      "estudiantes": [
        {"nombre": "Ricardo", "apellido": "García", "cres": 0},
        {"nombre": "Adrián", "apellido": "Alzate", "cres": 0},
        {"nombre": "Adriana", "apellido": "Cun", "cres": 0},
        {"nombre": "Gabriela", "apellido": "Carranza", "cres": 0},
        {"nombre": "Daniela", "apellido": "Rodríguez", "cres": 0},
        {"nombre": "Andrés", "apellido": "Ramírez", "cres": 0},
        {"nombre": "Roberto", "apellido": "Jaimes", "cres": 0}
      ]
    },
    {
      "nrc": "1101",
      "grado": "11",
      "curso": "01",
      "estudiantes": [
        {"nombre": "Daniel", "apellido": "Duarte", "cres": 0},
        {"nombre": "Katherine", "apellido": "Leyva", "cres": 0},
        {"nombre": "Katy", "apellido": "Petro", "cres": 0},
        {"nombre": "Yuly", "apellido": "Mohamad", "cres": 0},
        {"nombre": "Julieth", "apellido": "Gutiérrez", "cres": 0},
        {"nombre": "Lily", "apellido": "Racero", "cres": 0},
        {"nombre": "Clarence", "apellido": "Miranda", "cres": 0}
      ]
    },
    {
      "nrc": "904",
      "grado": "9",
      "curso": "04",
      "estudiantes": [
        {"nombre": "David", "apellido": "Durán", "cres": 0},
        {"nombre": "Julián", "apellido": "Calzada", "cres": 0},
        {"nombre": "Ricardo", "apellido": "Moreno", "cres": 0},
        {"nombre": "Cristian", "apellido": "Castro", "cres": 0},
        {"nombre": "Juan", "apellido": "Orjuela", "cres": 0},
        {"nombre": "Cristina", "apellido": "Lambada", "cres": 0},
        {"nombre": "Alejandra", "apellido": "Orejuela", "cres": 0}
      ]
    }
  ];

  courseForm!: FormGroup;

  constructor(
      private formBuilder: FormBuilder,
      // private adminService: AdminService
  ) { }

  ngOnInit(): void {
      this.buildForms();
  }

  buildForms(){
      this.courseForm = this.formBuilder.group({
          NRC: ['', Validators.required],
          grado: ['',
            Validators.compose([
              Validators.required,
              Validators.min(1),
              Validators.max(11),
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

  addCourse(){
    this.courses.push();
  }

  toggleForm(){
    this.showForm = !this.showForm;
  }

  saveCourseData(values: any){
    let payload = {
      nrc: values.NRC,
      grado: values.grado,
      curso: values.curso,
      estudiantes: []
    }
    this.courses.push(payload);
    console.log(this.courses);
    this.toggleForm();
  }
}
