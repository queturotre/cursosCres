import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
// import { AdminService } from "src/app/services/admin.service";

@Component({
    selector: 'app-course-creation',
    templateUrl: './createCourse.component.html',
    styleUrls: ['./course.creation.component.css']
})

export class CreateCourseComponent implements OnInit{
  // @Output() sender: EventEmitter<any> = new EventEmitter();
    title: String = "Crear nuevo curso";

    courseForm!: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        // private adminService: AdminService
    ) { }

    ngOnInit(): void {
        this.buildForms();
        // this.getInitialData();
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
      let payload = {
        nrc: values.NRC,
        grado: values.grado,
        curso: values.curso,
      }
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
