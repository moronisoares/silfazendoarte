import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfirmacaoComponent } from 'src/app/components/modal-confirmacao/modal-confirmacao.component';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.scss']
})
export class CarrinhoComponent implements OnInit {

  lstProdutos: object[] = [];
  total: number = 0;
  tempoEstimado: number = 0;
  dataEstimada: string;
  constructor(public app: AppService, public datePipe: DatePipe, private dialog: MatDialog) { }

  ngOnInit(): void {
    const localStorageCarrinho: string = localStorage.getItem("carrinho");
    if (localStorageCarrinho) {
      this.lstProdutos = JSON.parse(localStorageCarrinho);
    }
    this.listarInformacoesProdutos();
  }

  deletarProduto(id) {
    this.dialog.open(ModalConfirmacaoComponent, {
      height: '180px',
      width: '300px',
      data: {
        title: "Excluir produto?",
        msg: "Tem certeza que deseja excluir esse produto do carrinho?"
      }
    })
      .afterClosed()
      .subscribe((value) => {
        if (value == true) {
          var index = this.lstProdutos.findIndex(a => a['Id'] == id);
          this.lstProdutos.splice(index, 1);
          localStorage.setItem("carrinho", JSON.stringify(this.lstProdutos));
          this.listarInformacoesProdutos()
        }
      })
  }

  listarInformacoesProdutos() {
    this.total = 0;
    this.tempoEstimado = 0;
    this.dataEstimada = "";
    if (this.lstProdutos.length > 0) {
      this.lstProdutos.forEach((produto: any) => {
        this.total += produto.Valor * produto.Quantidade;
        this.tempoEstimado += produto.TempoEstimado * produto.Quantidade;
      })
      this.dataEstimada = this.datePipe.transform(this.app.retornaDataEstimadaEntrega(this.tempoEstimado), "dd/MM/yyyy");
    }
  }

  fazerPedido() {
    let stringProdutos: string = "";
    this.lstProdutos.forEach((item: object) => {
      stringProdutos += `Produto: ${item['Quantidade']}x ${item['Nome']}
        \nValor: R$ ${item['Valor'].toFixed(2).replace(".", ",")}
        \nObservação: ${item['DescricaoCliente'] ? item['DescricaoCliente'] : 'Não Informado'}
        \n----------------------------
      `;
    })
    const mensagem = `Gostaria de encomendar os seguintes itens:
      \n${stringProdutos}
      \nData Estimada: ${this.dataEstimada}
      \nValor Total: R$ ${this.total.toFixed(2).replace(".", ",")}
    `;

    window.open(
      "https://api.whatsapp.com/send?phone=" +
      "+5521994684609" +
      "&text=" +
      window.encodeURIComponent(mensagem)
    );
  }
}
