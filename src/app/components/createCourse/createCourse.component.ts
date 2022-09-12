import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
// import { AdminService } from "src/app/services/admin.service";

@Component({
    selector: 'app-course-creation',
    templateUrl: './createCourse.component.html',
    styleUrls: ['./course.creation.component.css']
})

export class CreateCourseComponent implements OnInit{
  @Output() sender: EventEmitter<any> = new EventEmitter();
    title: String = "Crear nuevo curso";
<<<<<<< HEAD
    studentData = [];
    dataCurso = {
      nrc: 0,
      grado: 0,
      curso: 0
    }
=======
>>>>>>> workablesf

    courseForm!: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        // private adminService: AdminService
    ) { }

    ngOnInit(): void {
        this.buildForms();
        this.getInitialData();
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

<<<<<<< HEAD
    getInitialData(){
    //Traer asíncronamente la data de la url con ayuda de adminservice
      this.adminService.getStudent().subscribe(
        (resp) => {
          let tree = resp;
          this.studentData = tree;
        },
        (errResp) => {
          console.error(errResp);
        },
        () => {
          console.log('l');
        })
    }

    saveCourseData(values: any){
    console.log(this.studentData);
    this.courseForm.markAllAsTouched();
    if (this.courseForm.invalid) return;

    let payload = {
      nrc: values.NRC,
      curso: values.curso,
      grado: values.grado
    }

    // this.adminService.addCourse(payload).subscribe(
    //   (resp) => {
    //     if (resp.success){
    //       console.log('Datos actualizados');
    //     }
    //   },
    //   (errResp) => {
    //     console.error(errResp);
    //   }
    // )
=======
    saveCourseData(values: any){
      let payload = {
        nrc: values.NRC,
        grado: values.grado,
        curso: values.curso,
      }
>>>>>>> workablesf
    }
}
  // this.courseForm.markAllAsTouched();
  // if (this.courseForm.invalid) return;
  // this.adminService.addCourse(payload).subscribe(
  //   (resp) => {
  //     if (resp.success){
  //       console.log('Datos actualizados');
  //     }
  //   },
  //   (errResp) => {
  //     console.error(errResp);
  //   }
  // )
