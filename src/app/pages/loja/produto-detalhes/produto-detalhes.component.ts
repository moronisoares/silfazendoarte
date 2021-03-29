import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-produto-detalhes',
  templateUrl: './produto-detalhes.component.html',
  styleUrls: ['./produto-detalhes.component.scss']
})
export class ProdutoDetalhesComponent implements OnInit {

  lstFotos: string[] = [];
  produto: object;
  descricaoCliente: string = "";
  quantidade: number = 1;

  constructor(@Inject(MAT_DIALOG_DATA) public params,
    public dialogRef: MatDialogRef<ProdutoDetalhesComponent>,
    public app: AppService,
    private snackBar: MatSnackBar) {
    this.lstFotos = params.produto.FilePath;
    this.produto = params.produto;
  }

  ngOnInit(): void {
  }

  adicionarCarrinho() {
    let localStorageCarrinho: string = localStorage.getItem("carrinho");
    let carrinho: object[] = [];
    if (localStorageCarrinho) {
      carrinho = JSON.parse(localStorageCarrinho);
    }
    let produto = Object.assign({ DescricaoCliente: this.descricaoCliente, Quantidade: this.quantidade }, this.produto);

    carrinho.push(produto);
    localStorage.setItem("carrinho", JSON.stringify(carrinho))
    this.snackBar.open('Produto adicionado ao carrinho', 'Fechar',
      {
        duration: 4000,
        verticalPosition: 'top',
        panelClass: ['snackbar']
      }
    );
    this.dialogRef.close();
  }
}
