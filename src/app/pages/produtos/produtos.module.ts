import { NgModule } from '@angular/core';
import { ProdutosComponent } from './produtos.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ProdutosCadastroComponent } from './produtos-cadastro/produtos-cadastro.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { ModalConfirmacaoComponent } from 'src/app/components/modal-confirmacao/modal-confirmacao.component';
const router: Routes = [
  { path: "", component: ProdutosComponent },
  { path: "cadastro", component: ProdutosCadastroComponent },
];

@NgModule({
  declarations: [
    ProdutosComponent,
    ProdutosCadastroComponent,
    ModalConfirmacaoComponent
  ],
  imports: [
    SharedModule,
    MatProgressBarModule,
    CurrencyMaskModule,
    RouterModule.forChild(router)
  ]
})
export class ProdutosModule { }
