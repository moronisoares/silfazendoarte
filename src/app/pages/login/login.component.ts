import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  validateForm: FormGroup;
  form: FormGroup["controls"];

  constructor(private router: Router, private fb: FormBuilder, private loginService: LoginService) {
    sessionStorage.clear();

    this.loginService.isLogado.emit(false);
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      Login: [null, [Validators.required]],
      Senha: [null, [Validators.required]]
    });
    this.form = this.validateForm.controls;
  }

  login() {
    this.validateForm.setValidators(this.loginValidator())

    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (this.validateForm.valid) {
      sessionStorage.setItem("l", "true");
      this.loginService.isLogado.emit(true);
      this.router.navigate(['/produtos']);
    } else {
      sessionStorage.setItem("l", "false");
      this.loginService.isLogado.emit(false);
    }
  }

  loginValidator(): ValidatorFn {
    return (group: FormGroup): ValidationErrors => {
      const login = group.controls['Login'];
      const senha = group.controls['Senha'];
      if (login.value !== "sil") {
        login.setErrors({ error: "Login incorreto" });
      }
      if (senha.value !== "123") {
        senha.setErrors({ error: "Senha incorreta" });
      }
      return;
    };
  }

  loja() {
    this.router.navigate(['/loja']);
  }

  enterKey() {
    let inputSenha = document.getElementById("txtSenha") as HTMLElement;
    if (this.form.Login.valid && !this.form.Senha.valid) {
      inputSenha.focus()
    } else {
      this.login();
    }
  }
}
