import { Component, OnInit } from '@angular/core';
import { ChatbaseService } from '../chat.service.spec';

@Component({
  selector: 'app-chatbase',
  templateUrl: './chatbase.component.html',
  styleUrl: './chatbase.component.css'
})
export class ChatbaseComponent implements OnInit {
  constructor(private chatbaseService: ChatbaseService) {}

  ngOnInit(): void {
    this.chatbaseService.loadChatbot();
  }
}