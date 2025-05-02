import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {ModalComponent} from '../modal/modal.component';

@Component({
  selector: 'app-cadastro',
  imports: [
    FormsModule,
    HttpClientModule,
    ModalComponent
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {
  showModal = false;

  formData = {
    email: '',
    password: '',
    cpf: '',
    name: '',
    birthdate: '',
    gender: '',
    cep: '',
    address: ''
  };

  constructor(private http: HttpClient) {
  } //inject

  onSubmit() {
    // Formatar o CPF no formato XXX.XXX.XXX-XX
    if (this.formData.cpf && this.formData.cpf.length === 11) {
      this.formData.cpf = this.formData.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }

    this.http.post('http://localhost:8081/cadastro', this.formData, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    }).subscribe({
      next: () => {
        console.log('Success');
        this.showModal = true;
      },
      error: (err) => {
        console.error('ERROR:', err);
        alert('Erro ao salvar cadastro.');
      }
    });
  }
}
