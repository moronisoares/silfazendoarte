import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AppService } from 'src/app/services/app.service';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-produtos-cadastro',
  templateUrl: './produtos-cadastro.component.html',
  styleUrls: ['./produtos-cadastro.component.scss']
})
export class ProdutosCadastroComponent implements OnInit {

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  validateForm: FormGroup;
  form: FormGroup["controls"];
  fileList: string[] = [];
  loading: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public params,
    public dialogRef: MatDialogRef<ProdutosCadastroComponent>,
    private storage: AngularFireStorage,
    private fb: FormBuilder,
    private crud: CrudService,
    private snackBar: MatSnackBar,
    public app: AppService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      Id: [null],
      Nome: [null, Validators.required],
      Valor: [null, Validators.required],
      FilePath: [null, Validators.required],
      Destaque: [null],
      Descricao: [null, Validators.required],
      TempoEstimado: [null, Validators.required]
    })
    
    if (this.params.produto) {
      this.validateForm.patchValue(this.params.produto);
      this.fileList = this.params.produto.FilePath;
      this.form = this.validateForm.controls;
    } else {
      this.form = this.validateForm.controls;
    }
  }

  uploadFile() {
    let input = document.createElement('input');
    input.type = 'file';
    input.onchange = _ => {
      this.loading = true;
      const file = input.files[0];
      const fileName = this.crud.CreateGuid();
      const filePath = '/fotosProdutos/' + fileName;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);
      this.uploadPercent = task.percentageChanges();
      task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          fileRef.getDownloadURL().subscribe((value) => {
            this.fileList.push(value);
            this.uploadPercent = null;
            this.loading = false;
          });
        })
      ).subscribe()
    };
    input.click();
  }

  deleteFile(url) {
    this.storage.refFromURL(url).delete();
    let index = this.fileList.indexOf(this.fileList.find(a => a == url));
    this.fileList.splice(index, 1);
    this.crud.editar(this.params.produto, 'produtos', this.form.Id.value);
    this.uploadPercent = null;
  }

  voltar(): void {
    this.dialogRef.close();
  }

  salvar() {
    this.loading = true;
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    this.validateForm.controls.FilePath.setValue(this.fileList);
    if (this.validateForm.valid) {
      if (this.form.Id.value) {
        this.crud.editar(this.validateForm.value, 'produtos', this.form.Id.value)
      } else {
        this.crud.salvar(this.validateForm.value, 'produtos');
      }
      setTimeout(() => {
        location.reload();
      }, 500)
    } else {
      if (this.fileList.length == 0) {
        this.snackBar.open('Imagem é obrigatória', 'Fechar', { duration: 3000, verticalPosition: 'bottom', panelClass: ['snackbar'] });
      }
    }
  }
}
