import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestPreClientComponent } from './request-pre-client.component';

describe('RequestPreClientComponent', () => {
  let component: RequestPreClientComponent;
  let fixture: ComponentFixture<RequestPreClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestPreClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestPreClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
