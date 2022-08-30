import { Component, OnInit } from "@angular/core";
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
        edad: 0,
        cres: 0
    }
    studentForm!: FormGroup;

    constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit(): void {
        this.buildForms();
    }

    buildForms(){
        this.studentForm = this.formBuilder.group({
            nombre: ['', Validators.required],
            edad: ['', Validators.required]
        });
    }

    showTableData(){
        this.showTable = !this.showTable;
    }
    showForm(){
        this.showStudentFormView = !this.showStudentFormView;
    }

    collectStudentData(values: any){
        this.showStudentFormView = !this.showStudentFormView;
        console.log(values);
    }
}
