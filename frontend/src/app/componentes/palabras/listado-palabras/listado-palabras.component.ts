import { Component, OnInit } from '@angular/core';
import { PalabrasService } from 'src/app/servicios/palabras.service';
import { filter, map } from 'rxjs/operators';
import { PalabrasI } from 'src/app/interfaces/palabras';

@Component({
  selector: 'app-listado-palabras',
  templateUrl: './listado-palabras.component.html',
  styleUrls: ['./listado-palabras.component.css']
})
export class ListadoPalabrasComponent implements OnInit {
  palabras: string[] = [];
  constructor(private palabrasApi: PalabrasService) {
    this.palabrasApi.getPalabras().pipe(filter(p => p != null)).subscribe(p => { this.palabras = p.map(p => p.palabra_frase) });
  }

  ngOnInit() {

  }

}
