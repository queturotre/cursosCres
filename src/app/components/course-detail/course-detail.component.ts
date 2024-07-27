import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course, Student } from 'src/app/models/courseData';
import { CoursesService } from 'src/app/services/courses.service';
import { StudentsService } from 'src/app/services/students.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadCourseDetail();
    this.buildForms();
  }

  buildForms(){
    this.studentForm = this.formBuilder.group({
      nombre: ['',
        Validators.compose([
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(2)
        ])
      ],
      apellido: ['',
        Validators.compose([
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(2)
        ])
      ],
      cres: ['',
        Validators.compose([
          Validators.required,
          Validators.min(0),
          Validators.max(5)
        ])
      ],
    });
  }

  loadCourseDetail(){
    if (this.nrc) {
      this.coursesService.getCourseByNrc(this.nrc).subscribe(
        (res: any) => {
          this.course = res[0];
          this.loadStudentsDetails();
        }, (err) => {
          console.error('Error fetching course details', err);
          this.toastrService.error(err);
        }
      );
    }
  }

  loadStudentsDetails(){
    if (this.nrc){
      this.studentsService.getStudentsByCourse(this.nrc).subscribe(
        (res) => {
          this.students = res;
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
        this.toastrService.success('Estudiante añadido 👍 exitosamente');
      },
      (err) => {
        console.error('Error adding student', err);
        this.toastrService.error('No se pudo añadir al estudiante', err);
      }
    );
  }

  deleteStudent(id: any, i: number) {
    if(confirm("Seguro que quiere eliminar el estudiante?")){
      this.students.splice(i, 1);
      this.studentsService.deleteStudent(id).subscribe(
        () => {
          console.log(`Student deleted successfully`);
          this.toastrService.success('Estudiante eliminado', 'Éxito');
        },
        (err) => {
          console.error(`Error deleting student`, err);
          this.toastrService.error('Estudiante eliminado', err);
        }
      );
    } else {
      this.toastrService.info('No se ha eliminado el estudiante');
    }
  }

  editStudents(){
    this.students.forEach(student => {
      this.studentsService.updateStudent(student).subscribe(
        () => {
          console.log(`${student.nombre} ${student.apellido} updated successfully`);
          this.toastrService.show('Todos los estudiantes han sido actualizados');
        },
        (err) => {
          console.error(`Error updating student ${student.nombre} ${student.apellido}`, err);
        }
      );
    });
  }

  deleteCourse(){
    if(confirm("El curso entero se eliminará. Está segur@ de esta acción?")){
      this.coursesService.deleteCourse(this.nrc).subscribe(
        () => {
          console.log(`The ENTIRE course has been deleted successfully`);
          this.toastrService.success('Curso '+this.nrc+' eliminado');
        },
        (err) => {
          console.error(`Error deleting course`, err);
          this.toastrService.error("No se ha podido eliminar el curso", "Error");
        }
      );
    } else {
      this.toastrService.info('No se ha eliminado el curso');
    }
  }

  showForm() {
    this.showStudentFormView = !this.showStudentFormView;
    if (!this.showStudentFormView){
      this.studentForm.reset();
    }
  }

  addCre(i: number) {
    this.students[i].cres += 1;
    this.studentsService.updateStudent(this.students[i]).subscribe();
  }

  diminishCre(i: number) {
    this.students[i].cres -= 1;
    this.studentsService.updateStudent(this.students[i]).subscribe();
  }

}
