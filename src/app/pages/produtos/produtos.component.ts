import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalConfirmacaoComponent } from 'src/app/components/modal-confirmacao/modal-confirmacao.component';
import { AppService } from 'src/app/services/app.service';
import { CrudService } from 'src/app/services/crud.service';
import { ProdutosCadastroComponent } from './produtos-cadastro/produtos-cadastro.component';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {

  lstProdutos: object[];

  constructor(private dialog: MatDialog,
    private crud: CrudService,
    public _sanitizer: DomSanitizer,
    public app: AppService) { }

  ngOnInit(): void {
    this.listarTodos();
  }

  modalCadastro(produto = null) {
    this.dialog.open(ProdutosCadastroComponent, {
      panelClass: 'modal',
      data: {
        produto
      }
    })
      .afterClosed()
      .subscribe((result) => {
        if (result.reload) {
          this.listarTodos();
        }
      })
  }

  listarTodos() {
    this.crud.listarTodos('produtos').then((collection) => {
      this.lstProdutos = collection.docs.map((doc) => {
        return { Id: doc.id, ...doc.data() }
      })
    })
  }

  deleteProduto(produto) {
    this.dialog.open(ModalConfirmacaoComponent, {
      height: '180px',
      width: '300px',
      data: {
        title: "Excluir Produto",
        msg: "Deseja realmente excluir esse produto?"
      }
    }).afterClosed().subscribe(value => {
      if (value == true) {
        this.crud.deletar('produtos', produto.Id).then(() => {
          this.listarTodos();
        })
      }
    })
  }
}
