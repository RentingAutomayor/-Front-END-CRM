import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestRiskComponent } from './request-risk.component';

describe('RequestRiskComponent', () => {
  let component: RequestRiskComponent;
  let fixture: ComponentFixture<RequestRiskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestRiskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestRiskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
