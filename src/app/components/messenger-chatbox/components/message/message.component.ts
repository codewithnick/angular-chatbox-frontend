import { ChangeDetectionStrategy, ChangeDetectorRef, Component,Input } from '@angular/core';
import { userMessages } from '../../model/messenger-chatbox.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageComponent{
@Input() message: userMessages;

constructor() { }
 // check attachment file is image or not
 protected isImage(file: File): boolean {
  return file.type.startsWith('image/');
}

}
