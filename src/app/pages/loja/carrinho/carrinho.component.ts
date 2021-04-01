import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfirmacaoComponent } from 'src/app/components/modal-confirmacao/modal-confirmacao.component';
import { AppService } from 'src/app/services/app.service';
import { LojaService } from 'src/app/services/loja.service';
import { EntregaComponent } from '../entrega/entrega.component';

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
  taxaEntrega: string;
  taxaEntregaNumber: number;
  endereco: object;

  constructor(public app: AppService, public datePipe: DatePipe, private dialog: MatDialog, private loja: LojaService) { }

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

  modalEndereco() {
    this.dialog.open(EntregaComponent, {
      panelClass: 'modal',
      height: '700px',
      width: '900px'
    })
      .afterClosed()
      .subscribe((response: object) => {
        const taxaEntrega = response['taxaEntrega'];
        this.endereco = response['form'];
        if (response['fazerPedido']) {
          if (taxaEntrega) {
            this.taxaEntregaNumber = taxaEntrega;
            this.total += taxaEntrega;
            this.taxaEntrega = "R$ " + taxaEntrega.toFixed(2).toString();
          } else {
            this.taxaEntrega = "A combinar";
          }
        }
      })
  }

  fazerPedido() {
    this.loja.fazerPedido(this.lstProdutos, this.dataEstimada, this.total, this.taxaEntrega, this.endereco);
  }
}
