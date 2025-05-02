import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Cadastro} from '../interface/cadastro';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {
  constructor(private http: HttpClient) { }

  regiterCadastro(data: Cadastro) {
    return this.http.post<Cadastro>(`${environment.apiUrl}`, data);
  }

}
