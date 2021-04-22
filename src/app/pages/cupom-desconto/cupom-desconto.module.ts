import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CupomDescontoComponent } from './cupom-desconto.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CupomDescontoCadastroComponent } from './cupom-desconto-cadastro/cupom-desconto-cadastro.component';

const router: Routes = [
  { path: "", component: CupomDescontoComponent },
  { path: "cadastro", component: CupomDescontoCadastroComponent }
];

@NgModule({
  declarations: [
    CupomDescontoComponent,
    CupomDescontoCadastroComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(router)
  ]
})
export class CupomDescontoModule { }
