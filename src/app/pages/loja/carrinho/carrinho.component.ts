import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalConfirmacaoComponent } from 'src/app/components/modal-confirmacao/modal-confirmacao.component';
import { AppService } from 'src/app/services/app.service';
import { CrudService } from 'src/app/services/crud.service';
import { LojaService } from 'src/app/services/loja.service';
import { AdicionarCupomComponent } from '../adicionar-cupom/adicionar-cupom.component';
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
  taxaEntregaNumber: number = 0;
  endereco: object;
  valorDesconto: number;

  constructor(public app: AppService,
    public datePipe: DatePipe,
    private dialog: MatDialog,
    private loja: LojaService,
    private crud: CrudService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.lstProdutos = this.loja.listarProdutosCarrinho();
    this.listarInformacoesProdutos();
  }

  listarInformacoesProdutos() {
    this.total = 0;
    this.tempoEstimado = 0;
    this.dataEstimada = "";
    this.lstProdutos = this.loja.listarProdutosCarrinho();
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
    const pedido = {
      Id: null,
      ValorTotal: this.total,
      TaxaEntrega: this.taxaEntrega,
      ValorTotalSemTaxa: this.total - this.taxaEntregaNumber,
      DatEstimada: this.dataEstimada,
      LstProdutos: this.lstProdutos,
      Endereco: this.endereco,
      Cupom: sessionStorage.getItem("cupom")
    }
    this.crud.salvar(pedido, 'pedidos');
    this.loja.fazerPedido(this.lstProdutos, this.dataEstimada, this.total, this.taxaEntrega, this.endereco);
  }

  modalCupom() {
    this.dialog.open(AdicionarCupomComponent,
      {
        height: '265px',
        width: '320px',
      }
    ).afterClosed()
      .subscribe((result: object) => {
        if (result["valor"]) {
          this.valorDesconto = result["valor"];
          this.total = this.total - result["valor"];
          this.snackBar.open('Cupom aplicado com sucesso!', 'Fechar',
            {
              duration: 4000,
              verticalPosition: 'top',
              panelClass: ['snackbar']
            }
          );
        } else {
          this.snackBar.open(result["msg"], 'Fechar',
            {
              duration: 4000,
              verticalPosition: 'top',
              panelClass: ['snackbar']
            }
          );
        }
      })
  }
}
