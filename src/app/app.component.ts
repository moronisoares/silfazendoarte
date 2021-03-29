import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  mostrarMenu: boolean = sessionStorage.getItem("l") == "true" ? true : false;

  constructor(private login: LoginService, private router: Router) {
    this.login.isLogado.subscribe(
      value => {
        this.mostrarMenu = value;
      }
    )
  }

  sair() {
    this.router.navigate(['/']);
  }
}
