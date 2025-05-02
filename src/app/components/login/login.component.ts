import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {LoginRequest} from '../../interface/login';
import {AuthService} from '../../services/auth.service';
import {TimelineComponent} from '../timeline/timeline.component';
import {FormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    TimelineComponent,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  credentials: LoginRequest = { email: '', password: '' };
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) {}

  loginWithTwitter() {
    this.http.get('http://localhost:8081/twitter/auth-url', { responseType: 'text', withCredentials: true })
      .subscribe({
        next: (authUrl: string) => {
          window.location.href = authUrl;
        },
        error: (err) => {
          console.error('Erro ao obter url de login do Twitter: ', err)
        }
      });
  }


  onSubmit() {
    this.authService.login(this.credentials).subscribe({
      next: (res) => {
        this.authService.saveToken(res.token, true); // true => é JWT
        this.router.navigate(['/timeline']);
      },
      error: () => {
        this.errorMessage = 'Login failed';
      }
    });
  }

}
