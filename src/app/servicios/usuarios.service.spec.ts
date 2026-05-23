import { TestBed } from '@angular/core/testing';
import { UsuariosService } from './usuarios.service';
import { SupabaseService } from './supabase.service';

describe('UsuariosService', () => {
  let service: UsuariosService;
  let mockSupabaseService: any;

  beforeEach(() => {
    mockSupabaseService = {
      supabase: {
        from: jasmine.createSpy('from').and.returnValue({
          select: jasmine.createSpy('select').and.returnValue(
            Promise.resolve({ data: [{ id: 1, nombre: 'Juan', documento: '123', contacto: 'juan@ucb.edu.bo' }], error: null })
          ),
          insert: jasmine.createSpy('insert').and.returnValue({
            select: jasmine.createSpy('select').and.returnValue({
              single: jasmine.createSpy('single').and.returnValue(
                Promise.resolve({ data: { id: 2, nombre: 'Ana', documento: '456', contacto: 'ana@ucb.edu.bo' }, error: null })
              )
            })
          })
        })
      }
    };

    TestBed.configureTestingModule({
      providers: [
        UsuariosService,
        { provide: SupabaseService, useValue: mockSupabaseService }
      ]
    });
    service = TestBed.inject(UsuariosService);
  });

  // 1. Instanciacion
  it('instancia', () => {
    expect(service).toBeTruthy();
  });
});