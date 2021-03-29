import { EventEmitter, Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public isLogado = new EventEmitter();

  constructor() { }
}
