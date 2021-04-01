import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.scss'],
  animations: [
    trigger("transitionMenu", [
      transition(":enter", [
        style({ width: "0px" }),
        animate(".5s ease-in-out", style({ width: "280px" })),
      ]),
      transition(":leave", [
        style({ width: "280px" }),
        animate("1s ease-in-out", style({ width: "0px" })),
      ]),
    ]),
    trigger("transition", [
      transition(":enter", [
        style({ opacity: 0 }),
        animate(".5s ease-in-out", style({ opacity: 0.3 })),
      ])
    ])
  ]
})
export class MenuLateralComponent implements OnInit {

  @Output() esconderMenu: EventEmitter<object> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  escondeMenu() {
    document.getElementById("menu").style.width = "0px";
    setTimeout(() => {
      this.esconderMenu.emit()
    }, 500)
  }

}
