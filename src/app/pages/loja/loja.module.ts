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
import { EntregaComponent } from './entrega/entrega.component';
import { NgxMaskModule } from 'ngx-mask';
import { AdicionarCupomComponent } from './adicionar-cupom/adicionar-cupom.component';
import { MatBadgeModule } from '@angular/material/badge';
import { ListaProdutosCarrinhoComponent } from 'src/app/components/lista-produtos-carrinho/lista-produtos-carrinho.component';

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
    CarrinhoComponent,
    EntregaComponent,
    AdicionarCupomComponent,
    ListaProdutosCarrinhoComponent
  ],
  imports: [
    SharedModule,
    MatListModule,
    MatBadgeModule,
    NgxMaskModule.forRoot(),
    RouterModule.forChild(router)
  ],
  providers: [
    DatePipe
  ]
})
export class LojaModule { }

