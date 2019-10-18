//https://ng-bootstrap.github.io/#/components/alert/examples

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgbModule,
  ],exports:[
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule
  ]
})
export class LibsbootstrapModule { }
