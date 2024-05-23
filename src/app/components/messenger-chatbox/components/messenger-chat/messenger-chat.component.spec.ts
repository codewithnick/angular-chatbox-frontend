import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessengerChatComponent } from './messenger-chat.component';

describe('MessengerChatComponent', () => {
  let component: MessengerChatComponent;
  let fixture: ComponentFixture<MessengerChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessengerChatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessengerChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should open file selection correctly', () => {
    spyOn(component.attachmentInput.nativeElement, 'click');
    component.openFileSelection();
    expect(component.attachmentInput.nativeElement.click).toHaveBeenCalled();
  });

  it('should check if the file is an image correctly', () => {
    const mockImageFile = new File([''], 'mockImage.png', { type: 'image/png' });
    const mockNonImageFile = new File([''], 'mockFile.pdf', { type: 'application/pdf' });

    expect(component.isImage(mockImageFile)).toBeTrue();
    expect(component.isImage(mockNonImageFile)).toBeFalse();
  });

  it('should add emoji correctly', () => {
    const mockEvent = { emoji: { native: '😊' } };
    component.newMessageContent = 'Hello';
    component.addEmoji(mockEvent);
    expect(component.newMessageContent).toEqual('Hello😊');
  });
});

