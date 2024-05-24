import { AfterViewInit, Component, ElementRef, ViewChild ,Input} from '@angular/core';
import { chatBoxMessage, myFile, userMessages } from '../../model/messenger-chatbox.model';
import { Constants } from 'src/app/components/shared/configs/constants';
import { MessengerChatboxService } from '../../services/messenger-chatbox.service';

@Component({
  selector: 'app-messenger-chat-textbox',
  templateUrl: './messenger-chat-textbox.component.html',
  styleUrl: './messenger-chat-textbox.component.scss'
})
export class MessengerChatTextboxComponent implements AfterViewInit{
  @Input()
  sender:boolean=true;
  
  currentIndex:number=0;
  userChatBox: chatBoxMessage[] = [];

  constructor(private messageService: MessengerChatboxService) {}
  ngAfterViewInit(): void {
    //subscribe to changes in user chatbox
    this.messageService.userChatBox$.subscribe((data) => {
      this.userChatBox = data;
    });
    //subscribe to changes in selected index
    this.messageService.selectedSlideIndex$.subscribe((data) => {
      this.currentIndex = data;
    });
  }
  showEmojiPallet:boolean = false;
  newMessageContent: string = '';
  @ViewChild('attachmentInput') attachmentInput: ElementRef;
  fileBuffer: myFile= {
    file: null,
    fileUrl: null,
    fileIcon: null
  
  };
    // send message
    sendMessage() {
      if (this.newMessageContent.trim() !== '' || this.fileBuffer!=null) {
        const Time = new Date();
        let  newMessage:userMessages = { content: this.newMessageContent,
          type: (this.sender) ? 'sent' : 'received',
          timeStamp: Time,
          file:this.fileBuffer};
        this.userChatBox[this.currentIndex].messages.push(newMessage);
        this.newMessageContent = '';
        this.fileBuffer = {
          file: null,
          fileUrl: null,
          fileIcon: null
        };
      }
    }
  
    // select attachment
    openFileSelection() {
      this.attachmentInput.nativeElement.click();
    }
  
    // on send attachment
    handleFileSelect(event: Event) {
      const inputElement = event.target as HTMLInputElement;
      const files = inputElement.files;
      let fileIcon = 'files (1).svg';
  
      if (files && files.length > 0) {
  
        const reader = new FileReader();
        reader.onload = (e: any) => {
          // for display icon of file
          Constants.fileIconList.filter((row) => {
            row.type == files[0].name?.split('.').pop() ? fileIcon = row.icon : '';
          });
          this.fileBuffer = {
            file: files[0],
            fileUrl: e.target.result,
            fileIcon: fileIcon
          }; 
        };
  
        // Read the file as a data URL
        reader.readAsDataURL(files[0]);
      }
    }
    
  // when click on emoji
  addEmoji(event:any){
    console.log(event)

    this.newMessageContent = this.newMessageContent + event.emoji.native;
  this.showEmojiPallet = false;

  }
}
