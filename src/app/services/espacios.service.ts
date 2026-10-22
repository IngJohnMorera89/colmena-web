import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { API_URL } from '../core/api';
import { mensajeDeError } from '../core/errores';

export type TipoEspacio = 'SALA_REUNIONES' | 'OFICINA_PRIVADA' | 'CABINA' | 'AUDITORIO';

export interface Espacio {
  id: number;
  nombre: string;
  tipo: TipoEspacio;
  capacidad: number;
  precioHora: number;
  descripcion: string | null;
  imagenUrl: string | null;
  activo: boolean;
}

export const NOMBRE_TIPO: Record<TipoEspacio, string> = {
  SALA_REUNIONES: 'Sala de reuniones',
  OFICINA_PRIVADA: 'Oficina privada',
  CABINA: 'Cabina',
  AUDITORIO: 'Auditorio'
};

@Injectable({ providedIn: 'root' })
export class EspaciosService {
  private http = inject(HttpClient);
  private apiUrl = `${API_URL}/espacios`;

  private lista = signal<Espacio[]>([]);
  private cargandoSignal = signal(false);
  private errorSignal = signal<string | null>(null);

  espacios = this.lista.asReadonly();
  cargando = this.cargandoSignal.asReadonly();
  error = this.errorSignal.asReadonly();

  // GET /api/espacios: el backend decide si devuelve todos o solo los activos
  cargar() {
    this.cargandoSignal.set(true);
    this.errorSignal.set(null);

    this.http.get<Espacio[]>(this.apiUrl).subscribe({
      next: (datos) => {
        this.lista.set(datos);
        this.cargandoSignal.set(false);
      },
      error: (error: HttpErrorResponse) => {
        this.errorSignal.set(mensajeDeError(error));
        this.cargandoSignal.set(false);
      }
    });
  }

  // PATCH /api/espacios/{id}/estado (exige ESPACIOS_GESTIONAR)
  cambiarEstado(espacio: Espacio, activo: boolean) {
    this.errorSignal.set(null);

    this.http.patch<Espacio>(`${this.apiUrl}/${espacio.id}/estado`, { activo }).subscribe({
      next: (actualizado) => {
        this.lista.update(actuales =>
          actuales.map(e => (e.id === actualizado.id ? actualizado : e))
        );
      },
      error: (error: HttpErrorResponse) => this.errorSignal.set(mensajeDeError(error))
    });
  }
}