import { Component, ChangeDetectorRef } from '@angular/core';
import { StudentModel } from '../../models/student.model';
import { FormsModule } from '@angular/forms';
import { v4 as uuid } from 'uuid';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss',
})
export class StudentComponent {
  constructor(private cdr: ChangeDetectorRef) {}

  add = 'Enregistrement Etudiant';
  parcours: string[] = ['DA2I', 'RPM', 'AES'];
  niveaux: string[] = ['L1', 'L2', 'L3'];

  openAjouter: boolean = false;

  studentVideo: StudentModel = {
    matricule: '',
    nom: '',
    prenoms: '',
    niveau: '',
    parcour: '',
  };

  ajoutEtudiant() {
    this.openAjouter = !this.openAjouter;
    this.student.matricule = uuid();
  }
  //  template model
  student: StudentModel = {
    matricule: '',
    nom: '',
    prenoms: '',
    niveau: '',
    parcour: '',
  };
  //  output data
  data: StudentModel[] = [];

  ngAfterViewInit() {
    if (typeof window != 'undefined') {
      this.getData();
    }
    this.cdr.detectChanges();
  }

  //  get all  data from localstorage
  getData() {
    this.data.splice(0, this.data.length);
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (key && key.startsWith('student-')) {
        const item = window.localStorage.getItem(key);
        if (item) {
          this.data.push(JSON.parse(item));
        }
      }
    }
  }

  closeModal() {
    this.openAjouter = false;
    this.student = {
      niveau: '',
      nom: '',
      prenoms: '',
      matricule: '',
      parcour: '',
    };
  }

  // insert data
  saveData(student: StudentModel) {
    if (this.student.nom === '') {
      Swal.fire({
        icon: 'error',
        text: 'Veuillez remplir le(s) champ(s) vide(s)',
      });
      this.openAjouter = true;
      this.student.matricule = uuid();
    } else {
      window.localStorage.setItem(
        `student-${student.matricule}`,
        JSON.stringify(student),
      );
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Etudiant ajouter',
        showConfirmButton: false,
        timer: 1500,
      });
      this.student = this.studentVideo;
      this.openAjouter = false;
      this.getData();
    }
  }

  //---------------------  delete--------------------------

  deleteData(student: StudentModel) {
    this.student = this.studentVideo;
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: 'SUPPRESSION',
        text: "Voulez-vous vraiment supprimer l'etudiant ?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Supprimer !',
        cancelButtonText: 'Annuler !',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire({
            title: 'Supprimer',
            text: 'Suppression avec success',
            icon: 'success',
            showConfirmButton: false,
            timer: 1000,
          });
          window.localStorage.removeItem(`student-${student.matricule}`);
          this.getData();
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: 'Annuler',
            text: 'Suppression Annuler :)',
            icon: 'error',
            timer: 1000,
            showConfirmButton: false,
          });
        }
      });
  }

  //  modif data
  modifData(data: StudentModel) {
    this.student = data;
    this.openAjouter = true;
    this.getData();
  }
}
