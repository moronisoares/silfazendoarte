import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from 'src/app/services/app.service';
import { LojaService } from 'src/app/services/loja.service';
import { ModalConfirmacaoComponent } from '../modal-confirmacao/modal-confirmacao.component';

@Component({
  selector: 'app-lista-produtos-carrinho',
  templateUrl: './lista-produtos-carrinho.component.html',
  styleUrls: ['./lista-produtos-carrinho.component.scss']
})
export class ListaProdutosCarrinhoComponent implements OnInit {

  @Input() lstProdutos: object[] = [];
  @Output() atualizaInfoProdutos: EventEmitter<object> = new EventEmitter();
  constructor(private dialog: MatDialog, public app: AppService) { }

  ngOnInit(): void {
    console.log(this.lstProdutos)
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
          this.atualizaInfoProdutos.emit();
        }
      })
  }

}
