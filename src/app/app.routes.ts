import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {NgModule} from '@angular/core';
import {LoginComponent} from './components/login/login.component';
import {AppComponent} from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {BrowserModule} from '@angular/platform-browser';
import {CadastroComponent} from './components/cadastro/cadastro.component';
import {AuthGuard} from './auth/auth.guard';
import {TimelineComponent} from './components/timeline/timeline.component';
import {ProfileComponent} from './components/profile/profile.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'timeline', component: TimelineComponent, canActivate: [AuthGuard] },
  { path: 'profile',  component: ProfileComponent },

];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppModule { }
