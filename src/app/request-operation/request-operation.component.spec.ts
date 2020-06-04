import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestOperationComponent } from './request-operation.component';

describe('RequestOperationComponent', () => {
  let component: RequestOperationComponent;
  let fixture: ComponentFixture<RequestOperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestOperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
