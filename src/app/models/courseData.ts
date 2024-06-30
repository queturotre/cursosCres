export interface Course {
  nrc: string;
  grado: string;
  curso: string;
  estudiantes: Students[];
}

export interface Students {
  nombre: string;
  apellido: string;
  cres: number;
}
