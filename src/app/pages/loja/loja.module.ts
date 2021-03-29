import { NgModule } from '@angular/core';
import { LojaComponent } from './loja.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProdutoDetalhesComponent } from './produto-detalhes/produto-detalhes.component';
import { CarrosselComponent } from 'src/app/components/carrossel/carrossel.component';
import { ListaProdutosComponent } from 'src/app/components/lista-produtos/lista-produtos.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { MatListModule } from '@angular/material/list';
import { DatePipe } from '@angular/common';

const router: Routes = [
  { path: "", component: LojaComponent },
  { path: "produto/:id", component: ProdutoDetalhesComponent }
];

@NgModule({
  declarations: [
    LojaComponent,
    ProdutoDetalhesComponent,
    CarrosselComponent,
    ListaProdutosComponent,
    CarrinhoComponent
  ],
  imports: [
    SharedModule,
    MatListModule,
    RouterModule.forChild(router)
  ],
  providers: [
    DatePipe
  ]
})
export class LojaModule { }

