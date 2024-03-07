import { defineStore } from 'pinia';
import api from '../api';

export const useSesionesStore = defineStore({
  id: 'sesion',
  state: () => ({
    loading: false,
    sesiones: [],
    pelicula: null as { titulo: string; descripcion: string; imagen: string } | null,
  }),
  actions: {
    async ObtenerSesionesPelicula(movieId: number) {
      this.loading = true;
      this.pelicula = null;
      this.sesiones = [];
      try {
        if (!movieId) throw new Error('ID de la película inválido');
        const response = await api.get(`/Sesion/Pelicula/${movieId}`);
        const sesionesData = response.data; 

        if (sesionesData.length > 0) {
          const { tituloPelicula, descripcionPelicula, imagenPelicula } = sesionesData[0];
          this.pelicula = { titulo: tituloPelicula, descripcion: descripcionPelicula, imagen: imagenPelicula };
        }
        this.sesiones = sesionesData.map((sesion: any) => ({
          ...sesion,
          fechaHora: this.CambiarFormatoFechaHora(sesion.fechaHora),
        }));
      } catch (error) {
        console.error('Error obteniendo las sesiones de la película:', error);
      } finally {
        this.loading = false;
      }
    },
    CambiarFormatoFechaHora(stringDeDateTime: string) {
      const opciones: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      };
      const dateTime = new Date(stringDeDateTime);
      return dateTime.toLocaleString('es-ES', opciones);
    },
  },
});