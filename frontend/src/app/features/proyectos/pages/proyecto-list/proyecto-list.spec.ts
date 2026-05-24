import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectoList } from './proyecto-list';

describe('ProyectoList', () => {
  let component: ProyectoList;
  let fixture: ComponentFixture<ProyectoList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProyectoList],
    }).compileComponents();

    fixture = TestBed.createComponent(ProyectoList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
