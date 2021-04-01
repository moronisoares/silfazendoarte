import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from 'src/app/services/app.service';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-area-entrega-cadastro',
  templateUrl: './area-entrega-cadastro.component.html',
  styleUrls: ['./area-entrega-cadastro.component.scss']
})
export class AreaEntregaCadastroComponent implements OnInit {

  validateForm: FormGroup;
  form: FormGroup["controls"];
  loading: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public params,
    public dialogRef: MatDialogRef<AreaEntregaCadastroComponent>,
    private fb: FormBuilder,
    private crud: CrudService,
    public app: AppService) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      Id: [null],
      Nome: [null, Validators.required],
      Valor: [null, Validators.required]
    })

    if (this.params.areaEntrega) {
      this.validateForm.patchValue(this.params.areaEntrega);
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
        this.crud.editar(this.validateForm.value, 'area-entrega', this.form.Id.value)
      } else {
        this.crud.salvar(this.validateForm.value, 'area-entrega');
      }
      this.dialogRef.close({ reload: true });
    }
  }
}
