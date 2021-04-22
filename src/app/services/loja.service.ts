import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class LojaService {

  constructor(private crud: CrudService) { }

  fazerPedido(lstProdutos, dataEstimada, total, taxaEntrega, objEndereco) {
    let stringProdutos: string = "";
    lstProdutos.forEach((item: object) => {
      stringProdutos += `Produto: ${item['Quantidade']}x ${item['Nome']}
        \nValor: R$ ${item['Valor'].toFixed(2).replace(".", ",")}
        \nObservação: ${item['DescricaoCliente'] ? item['DescricaoCliente'] : 'Não Informado'}
        \n----------------------------
      `;
    })
    const cupom = sessionStorage.getItem("cupom");
    const msgCupom = cupom ? `Cupom: ${cupom}` : "";
    const mensagem = `Gostaria de encomendar os seguintes itens:
      \n${stringProdutos}
      \nMeu nome é: ${objEndereco['Nome']}
      \nEndereço: ${objEndereco['Rua']}, ${objEndereco['Numero']} - ${objEndereco['Bairro']} - ${objEndereco['Cidade']} - ${objEndereco['Estado']}
      \nData Estimada: ${dataEstimada}
      \nTaxa de Entrega: ${taxaEntrega}
      \n${msgCupom}
      \nValor Total: R$ ${total.toFixed(2).replace(".", ",")}
    `;

    localStorage.clear();

    window.open(
      "https://api.whatsapp.com/send?phone=" +
      "+5511949858180" +
      "&text=" +
      window.encodeURIComponent(mensagem)
    );

    location.reload();
  }

  adicionarCupomDesconto(nomeCupom) {
    return this.crud.consultarPeloValor("cupom-desconto", "Nome", nomeCupom).then((collection) => {
      const cupom: object = collection.docs.map((doc) => {
        return { Id: doc.id, ...doc.data() }
      })[0];
      if (cupom) {
        return this.crud.consultarPeloValor("pedidos", "telefone", sessionStorage.getItem("telefone")).then((collection) => {
          const lstPedidosCliente: object[] = collection.docs.map((doc) => {
            return { Id: doc.id, ...doc.data() }
          });
          const verificaUsoCupom: object = lstPedidosCliente.find(a => a["Cupom"] == nomeCupom);
          const cupomSessionStorage: string = sessionStorage.getItem("cupom");
          if (verificaUsoCupom || cupomSessionStorage) {
            return { success: false, msg: "Cupom já usado!" }
          } else {
            sessionStorage.setItem("cupom", cupom["Nome"])
            return { success: true, valor: cupom["Valor"] };
          }
        })
      } else {
        return { success: false, msg: "Cupom não encontrado!" }
      }
    })
  }

  listarProdutosCarrinho() {
    const localStorageCarrinho: string = localStorage.getItem("carrinho");
    let lstProdutos: object[];
    if (localStorageCarrinho) {
      lstProdutos = JSON.parse(localStorageCarrinho);
      return lstProdutos;
    } else {
      return [];
    }
  }
}
