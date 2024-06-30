import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Course } from "src/app/models/courseData";

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
})

export class CourseComponent implements OnInit {
  @Input() course!: Course;
  studentForm!: FormGroup;

  showStudentFormView = false;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.buildForms();
  }

  buildForms() {
    this.studentForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      cres: [0,
        Validators.compose([
          Validators.required, Validators.min(0), Validators.max(10)
        ])
      ],
    });
  }

  addStudent() {
    this.studentForm.markAllAsTouched();
    if (this.studentForm.invalid) return;

    this.showForm();
    this.course.estudiantes.push(this.studentForm.value);
    this.studentForm.reset({ cres: 0 });
  }

  addCre(i: number) {
    this.course.estudiantes[i].cres += 1;
  }

  diminishCre(i: number) {
    this.course.estudiantes[i].cres -= 1;
  }

  deleteStudent(i: number) {
    this.course.estudiantes.splice(i, 1);
  }

  showForm() {
    this.showStudentFormView = !this.showStudentFormView;
  }
}
