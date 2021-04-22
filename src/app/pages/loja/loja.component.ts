import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfirmacaoComponent } from 'src/app/components/modal-confirmacao/modal-confirmacao.component';
import { AppService } from 'src/app/services/app.service';
import { CrudService } from 'src/app/services/crud.service';
import { LoginService } from 'src/app/services/login.service';
import { LojaService } from 'src/app/services/loja.service';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { ProdutoDetalhesComponent } from './produto-detalhes/produto-detalhes.component';

@Component({
  selector: 'app-loja',
  templateUrl: './loja.component.html',
  styleUrls: ['./loja.component.scss']
})
export class LojaComponent implements OnInit {

  lstProdutos: object[] = [];
  promptEvent: any;
  qtdProdutosCarrinho: Number;
  carrinho: object[] = [];

  constructor(
    private crud: CrudService,
    private loginService: LoginService,
    public app: AppService,
    private dialog: MatDialog,
    private loja: LojaService
  ) {
    window.addEventListener('beforeinstallprompt', event => {
      this.promptEvent = event;
      this.dialog.open(ModalConfirmacaoComponent, {
        width: "400px",
        height: "240px",
        data: {
          title: "Deseja instalar esse app?",
          msg: "Isso não ocupará espaço em seu dispositivo e irá facilitar a visualização dos produtos :)"
        }
      })
        .afterClosed()
        .subscribe((result) => {
          if (result == true) {
            this.promptEvent.prompt();
          }
        })
    });
  }

  ngOnInit(): void {
    this.listarProdutos()
    sessionStorage.clear();
    this.loginService.isLogado.emit(false);
    this.atualizarCarrinho()
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
    }).afterClosed()
      .subscribe(() => this.atualizarCarrinho());
  }

  filtroDestaques() {
    return this.lstProdutos.filter(a => a['Destaque'] == true);
  }

  verCarrinho() {
    this.dialog.open(CarrinhoComponent, {
      width: '900px',
      height: '700px',
      panelClass: 'modal'
    }).afterClosed()
      .subscribe(() => this.atualizarCarrinho());
  }

  atualizarCarrinho() {
    this.carrinho = this.loja.listarProdutosCarrinho();
    this.qtdProdutosCarrinho = this.carrinho.length;
  }
}
