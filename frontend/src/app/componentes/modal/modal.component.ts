import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

export class ModalComponent implements OnInit {
  @Input() my_modal_title;
  @Input() my_modal_content;

  @Output() resul: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }
  sendResultado(r) {
    console.log(r);
    this.resul.emit(r);
    this.activeModal.close;
  }
}
