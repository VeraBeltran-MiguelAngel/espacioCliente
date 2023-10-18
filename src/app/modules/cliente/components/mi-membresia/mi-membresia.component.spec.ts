import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiMembresiaComponent } from './mi-membresia.component';

describe('MiMembresiaComponent', () => {
  let component: MiMembresiaComponent;
  let fixture: ComponentFixture<MiMembresiaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MiMembresiaComponent]
    });
    fixture = TestBed.createComponent(MiMembresiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
