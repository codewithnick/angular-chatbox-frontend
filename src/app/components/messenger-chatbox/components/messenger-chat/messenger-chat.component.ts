import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import Swiper from 'swiper';
import { MessengerChatboxService } from '../../services/messenger-chatbox.service';
import { chatBoxMessage, userMessages,myFile } from '../../model/messenger-chatbox.model';
import { Constants } from 'src/app/components/shared/configs/constants';

@Component({
  selector: 'app-messenger-chat',
  templateUrl: './messenger-chat.component.html',
  styleUrls: ['./messenger-chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessengerChatComponent implements AfterViewInit {

  private chatboxSwiper: Swiper;
  protected newMessageContent: string = '';
  protected showEmojiPallet:boolean = false;
  @ViewChild('attachmentInput') attachmentInput: ElementRef;
  protected userChatBox: chatBoxMessage[] = []
  protected currentDate:Date=new Date();
  private fileBuffer: myFile= {
    file: null,
    fileUrl: null,
    fileIcon: null
  
  };

  constructor(private cdr:ChangeDetectorRef, private messengerChatboxService: MessengerChatboxService) {
    //update data in the service
    this.messengerChatboxService.setUserChatBox(this.userChatBox);
  }
  ngOnInit(): void {
    this.initMessages();
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      // initialize chat swiper with config
      this.chatboxSwiper = new Swiper('.chat-swiper-container', {
        slideToClickedSlide: true,
        slideActiveClass: 'selected-slide',
        initialSlide: Constants.userList.length/2,
        spaceBetween: 10,
        effect :'slide',
        speed: 900,
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        on: {
          // set index of service when slide change
          slideChange: () => {
            setTimeout(() => {
              this.messengerChatboxService.setSelectedSlideIndex(this.chatboxSwiper?.realIndex);
            }, 100);
          }
        },
      });
    }, 100);

    // subscribe to change slide observable
    this.messengerChatboxService.selectedSlideIndex$.subscribe(index => {
      this.chatboxSwiper?.slideTo(index);
    });
    //subscribe to changes in  userchatbox
    this.messengerChatboxService.userChatBox$.subscribe(chatbox=>{
      this.userChatBox=[...chatbox];
      console.log('hi');
      this.cdr.detectChanges();
    })
  }

  //function to intialise messages
  private initMessages(){
    let date = new Date().getTime();   
    let yesterday = new Date(date - 1000 * 60 * 60 * 24 * 1);
    let onehourago = new Date(date - 1000 * 60 * 60);

    
    for(let i=0;i<Constants.userList.length;i++){
      this.userChatBox.push({
       userId: i+1, 
       messages: 
       [
            { content: 'Hi Jake, how are you? I saw on the app that we’ve crossed paths several times this week😄', 
            type: 'received', 
            file: this.fileBuffer,
            timeStamp:yesterday }, //recieved yesterdays date
            { content: 'Haha truly! Nice to meet you Grace! What about a cup of coffee today evening?☕️', 
            type: 'sent', 
            file: this.fileBuffer,
            timeStamp:onehourago //sent 1 hour ago
            }
          ]
      });
    }
  }

  // check attachment file is image or not
  protected isImage(file: File): boolean {
    return file.type.startsWith('image/');
  }

}
