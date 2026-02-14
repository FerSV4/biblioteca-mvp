import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrosDisponiblesComponent } from './libros-disponibles.component';

describe('LibrosDisponiblesComponent', () => {
  let component: LibrosDisponiblesComponent;
  let fixture: ComponentFixture<LibrosDisponiblesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibrosDisponiblesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibrosDisponiblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
