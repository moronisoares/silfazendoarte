import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { LojaService } from 'src/app/services/loja.service';

@Component({
  selector: 'app-adicionar-cupom',
  templateUrl: './adicionar-cupom.component.html',
  styleUrls: ['./adicionar-cupom.component.scss']
})
export class AdicionarCupomComponent implements OnInit {
  validateForm: FormGroup;
  loading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AdicionarCupomComponent>,
    private fb: FormBuilder,
    private loja: LojaService) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      Nome: [null, Validators.required]
    })
  }

  voltar(): void {
    this.dialogRef.close();
  }

  enviar() {
    if (this.validateForm.valid) {
      this.loja.adicionarCupomDesconto(this.validateForm.controls["Nome"].value)
        .then((result: object) => {
          if (result["success"]) {
            this.dialogRef.close({ valor: result["valor"] });
          } else {
            this.dialogRef.close({ msg: result["msg"] });
          }
        })
    }
  }
}
