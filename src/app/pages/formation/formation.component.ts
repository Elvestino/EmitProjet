import { Component } from '@angular/core';

@Component({
  selector: 'app-formation',
  standalone: true,
  imports: [],
  templateUrl: './formation.component.html',
  styleUrl: './formation.component.scss',
})
export class FormationComponent {
  VersManagement(): void {
    const AES =
      'https://www.emit.mg/formation/nos-formations/administration-economique-et-sociale';
    window.location.href = AES;
  }
  VersInformatique(): void {
    const DA2I =
      'https://www.emit.mg/formation/nos-formations/developpement-d-application-internet-intranet';
    window.location.href = DA2I;
  }
  VersMultimedia(): void {
    const RPM =
      'https://www.emit.mg/formation/nos-formations/communication-multimedia';
    window.location.href = RPM;
  }
}
