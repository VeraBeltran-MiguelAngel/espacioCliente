import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogReciboComponent } from './dialog-recibo.component';

describe('DialogReciboComponent', () => {
  let component: DialogReciboComponent;
  let fixture: ComponentFixture<DialogReciboComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogReciboComponent]
    });
    fixture = TestBed.createComponent(DialogReciboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
