import { Component, OnInit, AfterViewInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
    selector: 'app-course',
    templateUrl:'./course.component.html',
    styleUrls: ['./course.component.css'],
})
export class CourseComponent implements OnInit{
    showTable = false;
    showStudentFormView = false
    dataHead = {
        nrc: 0,
        grado: 0,
        curso: 0
    }
    dataEstudiante = {
        nombre: '',
        edad: 0
    }
    studentForm!: FormGroup;

    myCres: number = 0;

    estudiantes: any[] = [
      {nombre: 'Ricardo', apellido: 'García', cres: 0},
      {nombre: 'Miguel', apellido: 'Castro', cres: 0},
      {nombre: 'Andrés', apellido: 'Castro', cres: 0},
      {nombre: 'Gabriel', apellido: 'García', cres: 0}
    ];

    constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit(): void {
        this.buildForms();
    }

    ngAfterViewInit(){
      // this.myCres = document.getElementById("myCres");
    }

    buildForms(){
        this.studentForm = this.formBuilder.group({
            nombre: ['', Validators.required],
            apellido: ['', Validators.required],
            cres: ['', Validators.required],
        });
    }

    showTableData(){
        this.showTable = !this.showTable;
    }

    // onKeyUp(event: any){
    //   this.myCres += event.target.value;
    // }
    addCre(i:any){
      this.estudiantes[i].cres += 1;
    }

    diminishCre(i:any){
      this.estudiantes[i].cres -= 1;
    }

    deleteStudent(i: any){
      this.estudiantes.splice(i, 1);
    }
    showForm(){
        this.showStudentFormView = !this.showStudentFormView;
    }

    collectStudentData(values: any){
        this.showStudentFormView = !this.showStudentFormView;
        this.estudiantes.push(values);
    }
}
