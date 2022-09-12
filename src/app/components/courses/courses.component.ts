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
    {nrc: '1004', grado: '10', curso: '04'},
    {nrc: '1101', grado: '11', curso: '01'},
    {nrc: '904', grado: '9', curso: '04'},
    {nrc: '803', grado: '8', curso: '03'},
    {nrc: '602', grado: '6', curso: '02'}
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
    }
    this.courses.push(payload);
    console.log(this.courses);
    this.toggleForm();
  }
}
