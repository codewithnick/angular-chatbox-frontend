import { TestBed } from '@angular/core/testing';
import { MessengerChatboxService } from './messenger-chatbox.service';

describe('MessengerChatboxService', () => {
  let service: MessengerChatboxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessengerChatboxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with default selected slide index', () => {
    service.selectedSlideIndex$.subscribe(index => {
      expect(index).toEqual(0);
    });
  });

  it('should set selected slide index correctly', () => {
    const newIndex = 2;
    service.setSelectedSlideIndex(newIndex);
    service.selectedSlideIndex$.subscribe(index => {
      expect(index).toEqual(newIndex);
    });
  });
});
