import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AreaEntregaCadastroComponent } from './area-entrega-cadastro/area-entrega-cadastro.component';
import { AreaEntregaComponent } from './area-entrega.component';

const router: Routes = [
  { path: "", component: AreaEntregaComponent },
  { path: "cadastro", component: AreaEntregaCadastroComponent },
];


@NgModule({
  declarations: [
    AreaEntregaComponent,
    AreaEntregaCadastroComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(router)
  ]
})
export class AreaEntregaModule { }
