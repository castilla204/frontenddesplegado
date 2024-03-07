// Importa defineStore de Pinia y la instancia de Axios configurada
import { defineStore } from 'pinia';
import api from '../api';

export const usePeliculasStore = defineStore({
  id: 'movies',
  state: () => ({
    peliculas: [],
    isLoading: false,
    pelicula: null,
  }),
  actions: {
    async obtenerPeliculas() {
      this.isLoading = true;
      try {
        // Usa Axios para hacer la solicitud HTTP
        const response = await api.get('Pelicula');
        // Actualiza el estado con los datos recibidos
        this.peliculas = response.data;
        this.isLoading = false;
      } catch (error) {
        console.error("Error al obtener películas:", error);
        this.isLoading = false;
      }
    },
  },
});