import { AfterViewInit, Component, ElementRef, ViewChild, Input, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { chatBoxMessage, myFile, userMessages } from '../../model/messenger-chatbox.model';
import { Constants } from 'src/app/components/shared/configs/constants';
import { MessengerChatboxService } from '../../services/messenger-chatbox.service';

@Component({
  selector: 'app-messenger-chat-textbox',
  templateUrl: './messenger-chat-textbox.component.html',
  styleUrls: ['./messenger-chat-textbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessengerChatTextboxComponent implements AfterViewInit, OnDestroy {
  @Input()
  public sender: boolean = true;

  @ViewChild('attachmentInput') attachmentInput!: ElementRef;

  protected showEmojiPallet: boolean = false;
  public newMessageContent: string = '';
  private currentIndex: number = 0;
  private userChatBox: chatBoxMessage[] = [];
  protected fileBuffer: myFile = {
    file: null,
    fileUrl: null,
    fileIcon: null
    };

  private subscriptions: Subscription = new Subscription();

  constructor(private messageService: MessengerChatboxService,private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
    //subscribe to changes in user chatbox
    this.subscriptions.add(
      this.messageService.userChatBox$.subscribe((data: chatBoxMessage[]) => {
        this.userChatBox = data;
      })
    );

    //subscribe to changes in selected index
    this.subscriptions.add(
      this.messageService.selectedSlideIndex$.subscribe((data: number) => {
        this.currentIndex = data;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  // send message
  protected sendMessage(): void {
    if (this.newMessageContent.trim() !== '' || this.fileBuffer.file !== null) {
      const time = new Date();
      const newMessage: userMessages = {
        content: this.newMessageContent,
        type: this.sender ? 'sent' : 'received',
        timeStamp: time,
        file: this.fileBuffer
      };

      this.userChatBox[this.currentIndex].messages.push(newMessage);
      this.resetMessageContent();

      setTimeout(() => {
        //scroll to bottom
        const chatboxBody = document.querySelectorAll('.chatbox-card-body')[this.currentIndex] as HTMLElement;
        chatboxBody.scrollTop = chatboxBody.scrollHeight;
      }, 100);
    }
  }

  private resetMessageContent(): void {
    this.newMessageContent = '';
    this.fileBuffer = {
      file: null,
      fileUrl: null,
      fileIcon: null
    };
  }

  // select attachment
  protected openFileSelection(): void {
    this.attachmentInput.nativeElement.click();
  }

  // on send attachment
  protected handleFileSelect(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;
    let fileIcon = 'files (1).svg';

    if (files && files.length > 0) {
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        // for display icon of file
        Constants.fileIconList.forEach((row) => {
          if (row.type === files[0].name.split('.').pop()) {
            fileIcon = row.icon;
          }
        });

        this.fileBuffer = {
          file: files[0],
          fileUrl: e.target?.result as string,
          fileIcon: fileIcon
        };
      };

      // Read the file as a data URL
      reader.readAsDataURL(files[0]);
    }
  }

  // when click on emoji
  protected addEmoji(event: any): void {
    console.log(event);
    this.newMessageContent += event.emoji.native;
    this.showEmojiPallet = false;
  }
}
