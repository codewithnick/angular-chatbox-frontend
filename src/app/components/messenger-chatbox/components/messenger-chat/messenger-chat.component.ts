import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import Swiper from 'swiper';
import { MessengerChatboxService } from '../../services/messenger-chatbox.service';
import { chatBoxMessage, userMessages,myFile } from '../../model/messenger-chatbox.model';
import { Constants } from 'src/app/components/shared/configs/constants';

@Component({
  selector: 'app-messenger-chat',
  templateUrl: './messenger-chat.component.html',
  styleUrls: ['./messenger-chat.component.scss']
})
export class MessengerChatComponent implements AfterViewInit {

  chatboxSwiper: Swiper;
  newMessageContent: string = '';
  showEmojiPallet:boolean = false;
  @ViewChild('attachmentInput') attachmentInput: ElementRef;
  userChatBox: chatBoxMessage[] = []
  currentDate:Date=new Date();
  fileBuffer: myFile= {
    file: null,
    fileUrl: null,
    fileIcon: null
  
  };
  constructor(private messengerChatboxService: MessengerChatboxService) {
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
    //update data in the service
    this.messengerChatboxService.setUserChatBox(this.userChatBox);
    }
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
  }


  // check attachment file is image or not
  isImage(file: File): boolean {
    return file.type.startsWith('image/');
  }

}
