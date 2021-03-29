import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-confirmacao',
  templateUrl: './modal-confirmacao.component.html',
  styleUrls: ['./modal-confirmacao.component.scss']
})
export class ModalConfirmacaoComponent implements OnInit {

  title: string;
  msg: string;

  constructor(@Inject(MAT_DIALOG_DATA) public params: { title: string, msg: string }) {
    this.title = params.title;
    this.msg = params.msg;
  }

  ngOnInit(): void {
  }

}
