import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { pesos } from '../../core/formato';
import { Reserva, ReservasService } from '../../services/reservas.service';

const formatoDia = new Intl.DateTimeFormat('es-CO', { weekday: 'short', day: 'numeric', month: 'short' });

@Component({
  imports: [RouterLink],
  selector: 'app-mis-reservas',
  styleUrl: './mis-reservas.css',
  templateUrl: './mis-reservas.html',
})
export class MisReservas {
  private reservasService = inject(ReservasService);

  reservas = this.reservasService.reservas;
  cargando = this.reservasService.cargando;
  error = this.reservasService.error;

  pesos = pesos;

  // Id de la reserva que espera confirmación para cancelarse
  porConfirmar = signal<number | null>(null);

  constructor() {
    this.reservasService.cargarMias();
  }

  // '2026-10-23' -> "vie, 23 de oct" (T00:00 para que se lea como fecha local)
  dia(fecha: string): string {
    return formatoDia.format(new Date(`${fecha}T00:00`));
  }

  // La misma regla del backend: solo lo CONFIRMADO que todavía no empieza
  sePuedeCancelar(reserva: Reserva): boolean {
    return reserva.estado === 'CONFIRMADA' && new Date(`${reserva.fecha}T${reserva.horaInicio}`) > new Date();
  }

  confirmarCancelacion(reserva: Reserva) {
    this.reservasService.cancelar(reserva);
    this.porConfirmar.set(null);
  }
}