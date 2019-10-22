import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket;
    constructor() {  this.socket = io.connect('http://localhost:3000');}
}
