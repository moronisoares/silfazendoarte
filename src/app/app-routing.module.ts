import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guard.guard';

const routes: Routes = [
  { path: "", loadChildren: () => import("./pages/login/login.module").then(mod => mod.LoginModule),  },
  { path: "produtos", loadChildren: () => import("./pages/produtos/produtos.module").then(mod => mod.ProdutosModule), canActivate: [AuthGuard]},
  { path: "loja", loadChildren: () => import("./pages/loja/loja.module").then(mod => mod.LojaModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
