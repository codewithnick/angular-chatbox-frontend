import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import Swiper from 'swiper';
import { MessengerChatboxService } from '../../services/messenger-chatbox.service';
import { chatBoxMessage } from '../../model/messenger-chatbox.model';
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
  userChatBox: chatBoxMessage[] = [
    { userId: 1, messages: [{ content: 'Hi Jake, how are you? I saw on the app that we’ve crossed paths several times this week😄', type: 'received', contentType: 'text' }, { content: 'Haha truly! Nice to meet you Grace! What about a cup of coffee today evening?☕️', type: 'sent', contentType: 'text' }] },
    { userId: 2, messages: [{ content: 'Hi Jake2, how are you? I saw on the app that we’ve crossed paths several times this week😄', type: 'received', contentType: 'text' }, { content: 'Haha truly! Nice to meet you Grace! What about a cup of coffee today evening?☕️', type: 'sent', contentType: 'text' }] },
    { userId: 3, messages: [{ content: 'Hi Jake3, how are you? I saw on the app that we’ve crossed paths several times this week😄', type: 'received', contentType: 'text' }, { content: 'Haha truly! Nice to meet you Grace! What about a cup of coffee today evening?☕️', type: 'sent', contentType: 'text' }] },
    { userId: 4, messages: [{ content: 'Hi Jake4, how are you? I saw on the app that we’ve crossed paths several times this week😄', type: 'received', contentType: 'text' }, { content: 'Haha truly! Nice to meet you Grace! What about a cup of coffee today evening?☕️', type: 'sent', contentType: 'text' }] },
    { userId: 5, messages: [{ content: 'Hi Jake5, how are you? I saw on the app that we’ve crossed paths several times this week😄', type: 'received', contentType: 'text' }, { content: 'Haha truly! Nice to meet you Grace! What about a cup of coffee today evening?☕️', type: 'sent', contentType: 'text' }] }
  ];

  constructor(private messengerChatboxService: MessengerChatboxService) {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      // initialize chat swiper with config
      this.chatboxSwiper = new Swiper('.chat-swiper-container', {
        slideToClickedSlide: true,
        slideActiveClass: 'selected-slide',
        initialSlide: 2,
        spaceBetween: 40,
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

  // send message
  sendMessage() {
    if (this.newMessageContent.trim() !== '') {
      const currentIndex = this.chatboxSwiper?.realIndex;
      const newMessage = { content: this.newMessageContent, type: 'sent', contentType: 'text' };
      this.userChatBox[currentIndex].messages.push(newMessage);
      this.newMessageContent = '';
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
      const currentIndex = this.chatboxSwiper?.realIndex;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        // for display icon of file
        Constants.fileIconList.filter((row) => {
          row.type == files[0].name?.split('.').pop() ? fileIcon = row.icon : '';
        });
        const newMessage = { content: files[0], type: 'sent', contentType: 'attachment', fileUrl: e.target.result, fileIcon };
        this.userChatBox[currentIndex].messages.push(newMessage);
        this.attachmentInput.nativeElement.value = '';
      };

      // Read the file as a data URL
      reader.readAsDataURL(files[0]);
    }
  }

  // check attachment file is image or not
  isImage(file: File): boolean {
    return file.type.startsWith('image/');
  }

  // when click on emoji
  addEmoji(event:any){
    console.log(event)

    this.newMessageContent = this.newMessageContent + event.emoji.native;
  this.showEmojiPallet = false;

  }
}
