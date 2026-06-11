import { TestBed } from '@angular/core/testing';
import { PrestamosService } from './prestamos.service';
import { SupabaseService } from './supabase.service';

describe('PU de prestamos, donde el prestamo no existe', () => {
  let service: PrestamosService;
  let supabaseSpy: any;

  beforeEach(() => {
    // Aqui pues se simula que el prestamo no existe, siendo null el dato recibido ...
    supabaseSpy = {
      supabase: {
        from: jasmine.createSpy('from').and.returnValue({
          select: jasmine.createSpy('select').and.returnValue({
            eq: jasmine.createSpy('eq').and.returnValue({
              single: jasmine.createSpy('single').and.returnValue(Promise.resolve({ data: null }))
            })
          })
        })
      }
    };

    TestBed.configureTestingModule({
      providers: [
        PrestamosService,
        { provide: SupabaseService, useValue: supabaseSpy }
      ]
    });
    service = TestBed.inject(PrestamosService);
  });

  it('se rechaza como el prestamo no exista', async () => {
    const resultado = await service.renovarPrestamo(999);
    
    expect(resultado).toBe('El prestamo no existe...');
  });
});

describe('PU de prestamos, devolucion de libro', () => {
  let service: PrestamosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PrestamosService,
        { provide: SupabaseService, useValue: { supabase: {} } } 
      ]
    });
    service = TestBed.inject(PrestamosService);
  });

  it('debe rechazar la devolucion si el prestamo ya figura como devuelto', async () => {
    // Act:: mockeo como si el encargado quiere marcar un libro devuelto, de manera duplicada
    const resultado = await service.registrarDevolucion(45, 'Devuelto');
    
    // Ass
    expect(resultado).toBe('No se puede: el libro ya esta marcado como devuelto');
  });
});