import { Component, OnInit } from '@angular/core';
import { PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
@Component({
  selector: 'app-listado-palabras',
  templateUrl: './listado-palabras.component.html',
  styleUrls: ['./listado-palabras.component.css']
})
export class ListadoPalabrasComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
