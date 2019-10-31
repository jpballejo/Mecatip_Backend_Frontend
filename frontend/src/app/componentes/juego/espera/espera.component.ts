import { Component, OnInit } from '@angular/core';



import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-espera',
  templateUrl: './espera.component.html',
  styleUrls: ['./espera.component.css']
})
export class EsperaComponent implements OnInit {

  jugadores=  [
  {
    name: 'jp',
    imagen: 'f/f3/Flag_of_Russia.svg'
    },
   {
    name: 'jp2',
    imagen: 'f/f3/Flag_of_Russia.svg'
    },  {
    name: 'jp3',
    imagen: 'f/f3/Flag_of_Russia.svg'
    },  {
    name: 'jp4',
    imagen: 'f/f3/Flag_of_Russia.svg'
    }
];
  closeResult: string;

  constructor(private modalService: NgbModal) {}

  ngOnInit() {
  }
  recibeDatos(dd){

  console.log(dd);

  };
    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return  `with: ${reason}`;
      }
    }

    open(content) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}
}
