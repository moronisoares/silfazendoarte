import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from 'src/app/services/app.service';
import { CrudService } from 'src/app/services/crud.service';
import { LoginService } from 'src/app/services/login.service';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { ProdutoDetalhesComponent } from './produto-detalhes/produto-detalhes.component';

@Component({
  selector: 'app-loja',
  templateUrl: './loja.component.html',
  styleUrls: ['./loja.component.scss']
})
export class LojaComponent implements OnInit {

  lstProdutos: object[] = [];

  constructor(private crud: CrudService, private loginService: LoginService, public app: AppService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.listarProdutos()
    sessionStorage.clear();
    this.loginService.isLogado.emit(false);
  }

  listarProdutos() {
    this.crud.listarTodos('produtos').then((collection) => {
      const docs = collection.docs.map((doc) => {
        return { Id: doc.id, ...doc.data() }
      })
      this.lstProdutos = docs.sort((a, b) => {
        if (a["Nome"] < b["Nome"]) {
          return -1;
        }
        if (a["Nome"] > b["Nome"]) {
          return 1;
        }
        return 0;
      })
    })
  }

  detalhesProduto(produto) {
    this.dialog.open(ProdutoDetalhesComponent, {
      width: '900px',
      height: '700px',
      panelClass: 'modal',
      data: {
        produto
      }
    })
  }

  filtroDestaques() {
    return this.lstProdutos.filter(a => a['Destaque'] == true);
  }

  verCarrinho() {
    this.dialog.open(CarrinhoComponent, {
      width: '900px',
      height: '700px',
      panelClass: 'modal'
    })
  }
}