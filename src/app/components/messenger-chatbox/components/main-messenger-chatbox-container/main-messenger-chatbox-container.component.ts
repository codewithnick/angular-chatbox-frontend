import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';

@Component({
  selector: 'app-main-messenger-chatbox-container',
  templateUrl: './main-messenger-chatbox-container.component.html',
  styleUrls: ['./main-messenger-chatbox-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainMessengerChatboxContainerComponent {
  constructor(private cdr:ChangeDetectorRef) { 
    this.cdr.markForCheck();
  }

}
