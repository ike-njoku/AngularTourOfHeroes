import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  message: string[] = [];
  addMessage(messages){
    this.message.push(messages);
  }

  clearMessages(){
    this.message = [];
  }



  constructor() { }
}
