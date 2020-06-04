import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TblContactsComponent } from './tbl-contacts.component';

describe('TblContactsComponent', () => {
  let component: TblContactsComponent;
  let fixture: ComponentFixture<TblContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TblContactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TblContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
