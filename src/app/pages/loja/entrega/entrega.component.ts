import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from 'src/app/services/app.service';
import { CrudService } from 'src/app/services/crud.service';
import { EntregaService } from 'src/app/services/entrega.service';

@Component({
  selector: 'app-entrega',
  templateUrl: './entrega.component.html',
  styleUrls: ['./entrega.component.scss']
})
export class EntregaComponent implements OnInit {

  validateForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EntregaComponent>,
    private fb: FormBuilder,
    private crud: CrudService,
    private entrega: EntregaService,
    public app: AppService
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      Nome: [null, Validators.required],
      CEP: [null, Validators.required],
      Estado: [null],
      Cidade: [null],
      Bairro: [null],
      Rua: [null, Validators.required],
      Numero: [null, Validators.required],
      Telefone: [null, Validators.required]
    });
  }

  buscarCEP() {
    const form: FormGroup["controls"] = this.validateForm.controls;
    this.entrega.buscarCep(form.CEP.value).then((response: object) => {
      form.Estado.setValue(response['uf']);
      form.Cidade.setValue(response['localidade']);
      form.Bairro.setValue(response['bairro']);
      form.Rua.setValue(response['logradouro']);
    })
  }

  setTaxaEntrega() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    const form: FormGroup["controls"] = this.validateForm.controls;
    this.crud.listarTodos("area-entrega").then((collection: object) => {
      const areasEntrega = collection['docs'].map((doc) => {
        return { Id: doc.id, ...doc.data() }
      })
      const cidade: object = areasEntrega.find(a => a["Nome"] == form.Cidade.value);
      const bairro: object = areasEntrega.find(a => a["Nome"] == form.Bairro.value);
      let taxaEntrega: number = null;
      if (bairro) {
        taxaEntrega = bairro['Valor'];
      } else if (cidade) {
        taxaEntrega = cidade['Valor'];
      }

      if (this.validateForm.valid) {
        sessionStorage.setItem("telefone", this.validateForm.controls["Telefone"].value);
        this.dialogRef.close({ fazerPedido: true, taxaEntrega, form: this.validateForm.value })
      }
    })
  }
}
