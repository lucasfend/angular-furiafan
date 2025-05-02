import { Component, OnInit } from '@angular/core';
import { TwitterService } from '../../services/twitter.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  imports: [CommonModule]
})
export class TimelineComponent implements OnInit {
  menuOpen = false;
  tweetContent: string = '';
  tweetImageUrl: string = '';
  tweetId: string = '1914726018440458417';

  constructor(
    private twitterService: TwitterService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      // Se o token estiver na URL, armazena-o no localStorage
      this.route.queryParams.subscribe(params => {
        const token = params['token'];
        if (token) {
          this.authService.saveToken(token, false); // False indica que é um token do Twitter
          this.router.navigate(['/timeline']); // Limpa a URL para não mostrar o token
        }
      });
    } else {
      // Se não estiver autenticado, redireciona para o login
      this.router.navigate(['/login']);
    }

    // get tweet por ID
    this.twitterService.getTweetById(this.tweetId).subscribe({
      next: (response) => {
        this.tweetContent = response.data[0]?.text || 'Tweet não encontrado.';

        const media = response.includes?.media?.[0];
        if (media && media.type === 'photo') {
          this.tweetImageUrl = media.url;
        } else {
          this.tweetImageUrl = '';
        }
      },
      error: (err) => {
        console.error('Erro ao buscar tweet:', err);
        this.tweetContent = 'Erro 429 - Many Requests';
        this.tweetImageUrl = '';
      }
    });

  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    console.log(this.menuOpen);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  navigateToProfile() {
    this.router.navigate(['/profile']);
    this.menuOpen = false;  // Fecha o menu ao navegar
  }


}
