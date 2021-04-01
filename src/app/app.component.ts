import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './services/app.service';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  mostrarMenu: boolean = sessionStorage.getItem("l") == "true" ? true : false;
  exibirMenuMobile: boolean = false;

  constructor(private login: LoginService, private router: Router, public app: AppService) {
    this.login.isLogado.subscribe(
      value => {
        this.mostrarMenu = value;
      }
    )
  }

  sair() {
    this.router.navigate(['/']);
  }
  
  esconderMenu() {
    this.exibirMenuMobile = false
  }
}
