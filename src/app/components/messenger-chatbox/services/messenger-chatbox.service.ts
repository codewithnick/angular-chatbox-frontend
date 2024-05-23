import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessengerChatboxService {

  private selectedSlideIndexSource = new BehaviorSubject<number>(0); // Initialize with default value
  selectedSlideIndex$ = this.selectedSlideIndexSource.asObservable();

  constructor() { }

  // set selected slide index
  setSelectedSlideIndex(index: number) {
    this.selectedSlideIndexSource.next(index);
  }
}
