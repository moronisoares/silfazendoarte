import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfirmacaoComponent } from 'src/app/components/modal-confirmacao/modal-confirmacao.component';
import { AppService } from 'src/app/services/app.service';
import { CrudService } from 'src/app/services/crud.service';
import { AreaEntregaCadastroComponent } from './area-entrega-cadastro/area-entrega-cadastro.component';

@Component({
  selector: 'app-area-entrega',
  templateUrl: './area-entrega.component.html',
  styleUrls: ['./area-entrega.component.scss']
})
export class AreaEntregaComponent implements OnInit {

  lstAreasEntrega: object[] = [];

  constructor(private dialog: MatDialog,
    private crud: CrudService,
    public app: AppService) { }

  ngOnInit(): void {
    this.listarTodos()
  }

  modalCadastro(areaEntrega = null) {
    this.dialog.open(AreaEntregaCadastroComponent, {
      panelClass: 'modal',
      width: "450px",
      height: "320px",
      data: {
        areaEntrega
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
    this.crud.listarTodos('area-entrega').then((collection) => {
      this.lstAreasEntrega = collection.docs.map((doc) => {
        return { Id: doc.id, ...doc.data() }
      })
    })
  }

  deleteAreaEntrega(produto) {
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
