import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateOfRequestComponent } from './state-of-request.component';

describe('StateOfRequestComponent', () => {
  let component: StateOfRequestComponent;
  let fixture: ComponentFixture<StateOfRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateOfRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateOfRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
