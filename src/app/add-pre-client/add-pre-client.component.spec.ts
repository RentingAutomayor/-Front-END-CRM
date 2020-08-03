import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPreClientComponent } from './add-pre-client.component';

describe('AddPreClientComponent', () => {
  let component: AddPreClientComponent;
  let fixture: ComponentFixture<AddPreClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPreClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPreClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
