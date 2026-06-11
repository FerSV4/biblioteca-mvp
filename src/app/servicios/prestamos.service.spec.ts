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