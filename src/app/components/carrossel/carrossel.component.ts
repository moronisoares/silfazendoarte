import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrossel',
  templateUrl: './carrossel.component.html',
  styleUrls: ['./carrossel.component.scss']
})
export class CarrosselComponent implements OnInit {

  @Input() lstFotos: string[];
  index: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  mudarIndex(direcao) {
    if (direcao == 'left' && this.index > 0) {
      this.index--;
    } else if (direcao == 'left' && this.index == 0) {
      this.index = this.lstFotos.length - 1;
    } else if (direcao == 'right' && this.index < (this.lstFotos.length - 1)) {
      this.index++;
    } else if (direcao == 'right' && this.index == (this.lstFotos.length - 1)) {
      this.index = 0;
    }
  }

  linkImagem(url) {
    window.open(url, '_blank');
  }
}
