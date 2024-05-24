import { AfterContentInit, AfterViewInit, Component,ElementRef,Input, ViewChild } from '@angular/core';
import { userMessages } from '../../model/messenger-chatbox.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent implements AfterContentInit{
@Input() message: userMessages;

constructor(public thisElement: ElementRef) { }
 // check attachment file is image or not
 isImage(file: File): boolean {
  return file.type.startsWith('image/');
}

  ngAfterContentInit(): void {
  }
}
