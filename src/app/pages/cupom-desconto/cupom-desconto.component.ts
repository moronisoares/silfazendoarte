import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfirmacaoComponent } from 'src/app/components/modal-confirmacao/modal-confirmacao.component';
import { AppService } from 'src/app/services/app.service';
import { CrudService } from 'src/app/services/crud.service';
import { CupomDescontoCadastroComponent } from './cupom-desconto-cadastro/cupom-desconto-cadastro.component';

@Component({
  selector: 'app-cupom-desconto',
  templateUrl: './cupom-desconto.component.html',
  styleUrls: ['./cupom-desconto.component.scss']
})
export class CupomDescontoComponent implements OnInit {

  lstCupons: object[];

  constructor(public app: AppService, private dialog: MatDialog, private crud: CrudService) { }

  ngOnInit(): void {
    this.listarTodos()
  }

  modalCadastro(cupom = null) {
    this.dialog.open(CupomDescontoCadastroComponent, {
      panelClass: 'modal',   
      width: "450px",
      height: "400px",
      data: {
        cupom
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
    this.crud.listarTodos('cupom-desconto').then((collection) => {
      this.lstCupons = collection.docs.map((doc) => {
        console.log(this.lstCupons)
        return { Id: doc.id, ...doc.data() }
      })
    })
  }
  
  deleteCupom(cupom) {
    this.dialog.open(ModalConfirmacaoComponent, {
      height: '180px',
      width: '300px',
      data: {
        title: "Excluir Cupom",
        msg: "Deseja realmente excluir esse cupom?"
      }
    }).afterClosed().subscribe(value => {
      if (value == true) {
        this.crud.deletar('cupom-desconto', cupom.Id).then(() => {
          this.listarTodos();
        })
      }
    })
  }
}
