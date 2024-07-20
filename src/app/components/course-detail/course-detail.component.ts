import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course, Student } from 'src/app/models/courseData';
import { CoursesService } from 'src/app/services/courses.service';
import { StudentsService } from 'src/app/services/students.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})

export class CourseDetailComponent implements OnInit {
  course: Course | null = null;
  students: Student[] = [];

  nrc: any = this.route.snapshot.paramMap.get('nrc');

  studentForm!: FormGroup;
  showStudentFormView = false;

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    private studentsService: StudentsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadCourseDetail();
    this.buildForms();
  }

  buildForms(){
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

  loadCourseDetail(){
    if (this.nrc) {
      this.coursesService.getCourseByNrc(this.nrc).subscribe(
        (resp: any) => {
          this.course = resp[0];
          this.loadStudentsDetails();
        }, (error) => {
          console.error('Error fetching course details', error);
        }
      );
    }
  }

  loadStudentsDetails(){
    if (this.nrc){
      this.studentsService.getStudentsByCourse(this.nrc).subscribe(
        (resp) => {
          this.students = resp;
        }
      );
    }
  }

  addStudent() {
    this.studentForm.markAllAsTouched();
    if (this.studentForm.invalid) return;

    const newStudent: Student = {
      nombre: this.studentForm.value.nombre,
      apellido: this.studentForm.value.apellido,
      cres: this.studentForm.value.cres,
      nrc: this.nrc
    };

    this.studentsService.addStudent(newStudent).subscribe(
      (res) => {
        console.log('Student added successfully ', res);
        this.showForm();
        this.loadStudentsDetails();
      },
      (err) => {
        console.error('Error adding student', err);
      }
    );
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

  deleteCourse(){
    this.coursesService.deleteCourse(this.nrc).subscribe(
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

  addCre(i: number) {
    this.students[i].cres += 1;
  }

  diminishCre(i: number) {
    this.students[i].cres -= 1;
  }

}
