import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-modal',
  imports: [CommonModule, RouterLink],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {

  @Input() isVisible = false;

  constructor(private router: Router) {
  }

 goToLogin() {
   this.router.navigate(['/login']);
 }

}
