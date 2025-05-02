import { Component } from '@angular/core';
import {NgIf} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [NgIf],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  arquivoSelecionado: File | null = null;
  resultado: any = null;

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.arquivoSelecionado = input.files[0];
    }
  }

  enviarDocumento(): void {
    if (!this.arquivoSelecionado) return;

    const cpf = localStorage.getItem('cpf') || ''; // <-- Pega o CPF salvo do usuário
    if (!cpf) {
      alert('CPF do usuário não encontrado!');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.arquivoSelecionado);
    formData.append('cpf', cpf);  // Envia o CPF do usuário logado

    this.http.post<any>('http://localhost:8081/documento/upload', formData)
      .subscribe({
        next: (res) => {
          this.resultado = res;
          alert(res.message);
        },
        error: (err) => {
          console.error('Erro no upload:', err);
          alert('Erro: ' + (err.error?.message || err.message));
        }
      });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
