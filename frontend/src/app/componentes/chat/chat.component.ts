import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  message: string;
  messages: string[] = [];

  constructor() {
  }

/*  sendMessage() {
    this.chatService.sendMessage(this.message);
    this.message = '';
  }*/

  ngOnInit() {
    /*this.chatService
      .getMessages()
      .subscribe((message: string) => {
        this.messages.push(message);
      });*/
  }

}
