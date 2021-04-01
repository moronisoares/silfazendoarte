import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EntregaService {

  constructor(private http: HttpClient,) { }

  public buscarCep(cep: string) {
    let api = "https://viacep.com.br/ws/" + cep + "/json/";
    return this.http.get(api).toPromise();
  }

}
