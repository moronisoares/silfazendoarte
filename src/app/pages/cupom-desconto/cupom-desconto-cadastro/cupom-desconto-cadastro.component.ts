import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from 'src/app/services/app.service';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-cupom-desconto-cadastro',
  templateUrl: './cupom-desconto-cadastro.component.html',
  styleUrls: ['./cupom-desconto-cadastro.component.scss']
})
export class CupomDescontoCadastroComponent implements OnInit {

  validateForm: FormGroup;
  form: FormGroup["controls"];
  loading: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public params,
    public dialogRef: MatDialogRef<CupomDescontoCadastroComponent>,
    private fb: FormBuilder,
    private crud: CrudService,
    public app: AppService) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      Id: [null],
      Nome: [null, Validators.required],
      Valor: [null, Validators.required],
      Usos: 0
    })

    if (this.params.cupom) {
      this.validateForm.patchValue(this.params.cupom);
      this.form = this.validateForm.controls;
    } else {
      this.form = this.validateForm.controls;
    }
  }

  voltar(): void {
    this.dialogRef.close({ reload: false });
  }

  salvar() {
    this.loading = true;
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (this.validateForm.valid) {
      if (this.form.Id.value) {
        this.crud.editar(this.validateForm.value, 'cupom-desconto', this.form.Id.value)
      } else {
        this.crud.salvar(this.validateForm.value, 'cupom-desconto');
      }
      this.dialogRef.close({ reload: true });
    }
  }
}
