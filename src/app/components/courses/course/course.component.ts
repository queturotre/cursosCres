import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Course, Student } from "src/app/models/courseData";
import { CoursesService } from "src/app/services/courses.service";
import { StudentsService } from "src/app/services/students.service";

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
})

export class CourseComponent implements OnInit {
  @Input() course!: Course;
  @Input() students!: Student[];
  studentForm!: FormGroup;

  showStudentFormView = false;

  constructor(
    private formBuilder: FormBuilder,
    private studentsService: StudentsService,
    private coursesService: CoursesService
  ) { }

  ngOnInit(): void {
    this.buildForms();
  }

  buildForms(): void {
    this.studentForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      cres: [0,
        Validators.compose([
          Validators.required, Validators.min(0), Validators.max(5)
        ])
      ],
    });
  }

  addStudent() {
    this.studentForm.markAllAsTouched();
    if (this.studentForm.invalid) return;

    const newStudent: Student = {
      nombre: this.studentForm.value.nombre,
      apellido: this.studentForm.value.apellido,
      cres: this.studentForm.value.cres,
      nrc: this.course.nrc
    };

    this.studentsService.addStudent(newStudent).subscribe(
      (res) => {
        console.log('Student added successfully ', res);
        this.showForm();
      },
      (err) => {
        console.error('Error adding student', err);
      }
    );
  }

  addCre(i: number) {
    this.students[i].cres += 1;
  }

  diminishCre(i: number) {
    this.students[i].cres -= 1;
  }

  saveCres(){
    this.students.forEach(student => {
      this.studentsService.updateStudent(student).subscribe(
        () => {
          console.log(`${student.nombre} ${student.apellido} updated successfully`);
        },
        (err) => {
          console.error(`Error updating student ${student.nombre} ${student.apellido}`, err);
        }
      );
    });
  }

  deleteStudent(id: any, i: number) {
    this.students.splice(i, 1);
    this.studentsService.deleteStudent(id).subscribe(
      () => {
        console.log(`Student deleted successfully`);
      },
      (err) => {
        console.error(`Error deleting student`, err);
      }
    );
  }

  deleteCourse(){
    this.coursesService.deleteCourse(this.course.nrc).subscribe(
      () => {
        console.log(`The ENTIRE course has been deleted successfully`);
      },
      (err) => {
        console.error(`Error deleting course`, err);
      }
    );
  }

  showForm() {
    this.showStudentFormView = !this.showStudentFormView;
    if (!this.showStudentFormView){
      this.studentForm.reset();
    }
  }
}
