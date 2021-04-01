import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LojaService {

  constructor() { }

  fazerPedido(lstProdutos, dataEstimada, total, taxaEntrega, objEndereco) {
    let stringProdutos: string = "";
    lstProdutos.forEach((item: object) => {
      stringProdutos += `Produto: ${item['Quantidade']}x ${item['Nome']}
        \nValor: R$ ${item['Valor'].toFixed(2).replace(".", ",")}
        \nObservação: ${item['DescricaoCliente'] ? item['DescricaoCliente'] : 'Não Informado'}
        \n----------------------------
      `;
    })
    const mensagem = `Gostaria de encomendar os seguintes itens:
      \n${stringProdutos}
      \nMeu nome é: ${objEndereco['Nome']}
      \nEndereço: ${objEndereco['Rua']}, ${objEndereco['Numero']} - ${objEndereco['Bairro']} - ${objEndereco['Cidade']} - ${objEndereco['Estado']}
      \nData Estimada: ${dataEstimada}
      \nTaxa de Entrega: ${taxaEntrega}
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
}
