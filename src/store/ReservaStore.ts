import { defineStore } from 'pinia';
import api from '../api'; 

interface ReservaData {
  sesionID: number;
  usuarioID: number;
  butacasIds: number[];
}

export const useReservaStore = defineStore({
  id: 'reservaStore',
  state: () => ({
    reservas: [],
  }),
  actions: {
    async realizarReserva(reservaData: ReservaData) {
      try {
        await api.post('/Reserva', reservaData);
      } catch (error) {
        console.error('Error al realizar la reserva:', error);
        throw new Error('Error al realizar la reserva');
      }
    }
  }
});