import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListacitasComponent } from './listacitas.component';

describe('ListacitasComponent', () => {
  let component: ListacitasComponent;
  let fixture: ComponentFixture<ListacitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListacitasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListacitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
