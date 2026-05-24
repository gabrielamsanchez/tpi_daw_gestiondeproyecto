import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectoModal } from './proyecto-modal';

describe('ProyectoModal', () => {
  let component: ProyectoModal;
  let fixture: ComponentFixture<ProyectoModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProyectoModal],
    }).compileComponents();

    fixture = TestBed.createComponent(ProyectoModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
