import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { AdminService } from "src/app/services/admin.service";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit{

  showForm: boolean = false;

  courses = [];

  courseForm!: FormGroup;

  constructor(
      private formBuilder: FormBuilder,
      private adminService: AdminService
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

  getInitialData(){
    this.adminService.getCourseData().subscribe(
      (resp) => {
        let tree = resp;
        this.courses = tree;
        console.log(this.courses);
      }
    );
  }

  addCourse(){
    this.courses.push();
  }

  toggleForm(){
    this.showForm = !this.showForm;
  }

  saveCourseData(values: any){
    console.log(this.courses);
    this.toggleForm();
  }
}
