import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.component.html',
  styleUrls: ['./lista-produtos.component.scss'],
  animations: [
    trigger("transitionDestaques", [
      transition(":enter", [
        style({ transform: "scale(0)" }),
        animate("{{time}}", style({ transform: "scale(1)" })),
      ]),
      transition(":leave", [
        animate("0.5s ease", style({ transform: "scale(0)" })),
      ]),
    ])
  ]
})
export class ListaProdutosComponent implements OnInit {

  @Input() lstProdutos: object[] = [];
  @Output() detalhesProduto = new EventEmitter();

  constructor(public app: AppService,) { }

  ngOnInit(): void {
  }
}
