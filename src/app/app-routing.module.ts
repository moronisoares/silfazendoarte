import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guard.guard';

const routes: Routes = [
  { path: "", loadChildren: () => import("./pages/login/login.module").then(mod => mod.LoginModule),  },
  { path: "area-entrega", loadChildren: () => import("./pages/area-entrega/area-entrega.module").then(mod => mod.AreaEntregaModule), canActivate: [AuthGuard]},
  { path: "cupom-desconto", loadChildren: () => import("./pages/cupom-desconto/cupom-desconto.module").then(mod => mod.CupomDescontoModule), canActivate: [AuthGuard]},
  { path: "loja", loadChildren: () => import("./pages/loja/loja.module").then(mod => mod.LojaModule) },
  { path: "produtos", loadChildren: () => import("./pages/produtos/produtos.module").then(mod => mod.ProdutosModule), canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
