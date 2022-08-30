import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
// import { AdminService } from "src/app/services/admin.service";

@Component({
    selector: 'app-course-creation',
    templateUrl: './createCourse.component.html',
    styleUrls: ['./course.creation.component.css']
})

export class CreateCourseComponent implements OnInit{
    title: String = "Crear nuevo curso";
    dataCurso = {
      nrc: 0,
      grado: 0,
      curso: 0
    }

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
    
    saveCourseData(values: any){
      this.courseForm.markAllAsTouched();
      if (this.courseForm.invalid) return;

      let payload = {
        nrc: values.NRC,
        grado: values.grado,
        curso: values.curso,
      }

      console.log(payload);

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
    }
}
