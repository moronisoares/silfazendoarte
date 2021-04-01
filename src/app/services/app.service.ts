import { HostListener, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  deviceWidth = window.innerWidth;
  deviceHeight = window.innerHeight;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.deviceWidth = event.target.innerWidth;
    this.deviceHeight = event.target.innerHeight;
  }

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

  retornaNumColsLista() {
    return this.deviceWidth >= 768? 2 : 1;
  }

  retornaNumRowsLista() {
    return this.deviceWidth >= 1600? '6:1' : this.deviceWidth >= 1100? '3:1' : '3:1';
  }
}
