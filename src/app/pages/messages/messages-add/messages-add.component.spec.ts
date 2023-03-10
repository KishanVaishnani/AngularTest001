import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageAddComponent } from './messages-add.component';

describe('MessageAddComponent', () => {
  let component: MessageAddComponent;
  let fixture: ComponentFixture<MessageAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
