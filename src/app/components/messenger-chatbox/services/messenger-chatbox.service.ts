import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { chatBoxMessage } from '../model/messenger-chatbox.model';

@Injectable({
  providedIn: 'root'
})
export class MessengerChatboxService {

  private selectedSlideIndexSource = new BehaviorSubject<number>(0); // Initialize with default value
  selectedSlideIndex$ = this.selectedSlideIndexSource.asObservable();

  private userChatBoxSource = new BehaviorSubject<chatBoxMessage[]>([]);
  userChatBox$ = this.userChatBoxSource.asObservable();

  constructor() { }

  // set selected slide index
  setSelectedSlideIndex(index: number) {
    this.selectedSlideIndexSource.next(index);
  }
  setUserChatBox(userChatBox: chatBoxMessage[]) {
    this.userChatBoxSource.next(userChatBox);
  }
}
