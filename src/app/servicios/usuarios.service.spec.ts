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
  // 2. Obtener
  it('getUsuarios', async () => {
    const usuarios = await service.getUsuarios();
    expect(usuarios.length).toBe(1);
    expect(usuarios[0].nombre).toBe('Juan');
    expect(mockSupabaseService.supabase.from).toHaveBeenCalledWith('usuarios');
  });
  // 3. Agregar
  it('agregarUsuario', async () => {
    const nuevoUsuario = await service.agregarUsuario('Ana', '456', 'ana@ucb.edu.bo');
    expect(nuevoUsuario.nombre).toBe('Ana');
    expect(nuevoUsuario.documento).toBe('456');
    expect(mockSupabaseService.supabase.from).toHaveBeenCalledWith('usuarios');
  });
  // 4. Error CI
  it('err 23505', async () => {
    mockSupabaseService.supabase.from.and.returnValue({
      insert: jasmine.createSpy('insert').and.returnValue({
        select: jasmine.createSpy('select').and.returnValue({
          single: jasmine.createSpy('single').and.returnValue(
            Promise.resolve({ data: null, error: { code: '23505' } })
          )
        })
      })
    });

    try {
      await service.agregarUsuario('Pedro', '123', 'pedro@ucb.edu.bo');
      fail();
    } catch (error: any) {
      expect(error.message).toBe('Usuario ya existente con ese CI 123');
    }
  });

  // 5. Error select
  it('err select', async () => {
    mockSupabaseService.supabase.from.and.returnValue({
      select: jasmine.createSpy('select').and.returnValue(
        Promise.resolve({ data: null, error: new Error('DB') })
      )
    });

    try {
      await service.getUsuarios();
      fail();
    } catch (error: any) {
      expect(error.message).toBe('DB');
    }
  });

  // 6. Error insert
  it('err insert', async () => {
    mockSupabaseService.supabase.from.and.returnValue({
      insert: jasmine.createSpy('insert').and.returnValue({
        select: jasmine.createSpy('select').and.returnValue({
          single: jasmine.createSpy('single').and.returnValue(
            Promise.resolve({ data: null, error: new Error('DB') })
          )
        })
      })
    });

    try {
      await service.agregarUsuario('Carlos', '999', 'carlos@ucb.edu.bo');
      fail();
    } catch (error: any) {
      expect(error.message).toBe('DB');
    }
  });
});