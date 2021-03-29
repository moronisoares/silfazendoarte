import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  deviceWidth = window.innerWidth;
  deviceHeight = window.innerHeight;

  constructor() { }

  retornaDataEstimadaEntrega(tempoEmDias): Date {
    let dataIncremento: Date = new Date();
    let numeroLoops: number = tempoEmDias;  
    for (let i = 0; i <= numeroLoops; i++) {
      //SE FOR SABADO OU DOMINGO
      if (dataIncremento.getDay() == 0 || dataIncremento.getDay() == 6) {
        numeroLoops++; //O DIA NÃO CONTA
        dataIncremento.setDate(dataIncremento.getDate() + 1); //ADICIONA MAIS UM DIA NA DATA DE ENTREGA
      } else {
        dataIncremento.setDate(dataIncremento.getDate() + 1); //ADICIONA MAIS UM DIA NA DATA DE ENTREGA
      }
    }
    return dataIncremento;
  }
}
