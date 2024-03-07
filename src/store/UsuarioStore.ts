import { defineStore } from 'pinia';
import sha256 from 'crypto-js/sha256';
import api from '../api'; // Asegúrate de que la ruta sea correcta para tu estructura de proyecto

interface Usuario {
  usuario: string;
  contrasena: string;
}

interface NuevoUsuario {
  nombre: string;
  correoElectronico: string;
  contrasena: string;
  rol: number; 
}

export const useUsuariosStore = defineStore({
  id: 'usuarios',
  state: () => ({
    logueado: localStorage.getItem('logueado') === 'true',
    currentUser: JSON.parse(localStorage.getItem('currentUser') || 'null'),
  }),
  actions: {
    async login(usuarioLogueandose: Usuario) {
      try {
        const ContraHasheada = sha256(usuarioLogueandose.contrasena).toString();
        const ContraHasheadaBase64 = btoa(ContraHasheada);

        const response = await api.post('/Usuario/login', {
          usuario: usuarioLogueandose.usuario,
          passwordHasheada: ContraHasheadaBase64,
        });

        if (response.status === 200) {
          const userData = response.data;
          this.logueado = true;
          this.currentUser = userData;
          localStorage.setItem('logueado', 'true');
          localStorage.setItem('currentUser', JSON.stringify(userData));
        } else {
          console.error('Error al iniciar sesión:', response.statusText);
          this.logueado = false;
          this.currentUser = null;
          localStorage.removeItem('logueado');
          localStorage.removeItem('currentUser');
          throw new Error('Error al iniciar sesión: ' + response.statusText);
        }
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        this.logueado = false;
        this.currentUser = null;
        localStorage.removeItem('logueado');
        localStorage.removeItem('currentUser');
        throw error;
      }
    },
    async register(nuevoUsuario: NuevoUsuario) {
      try {
        const ContraHasheada = sha256(nuevoUsuario.contrasena).toString();

        const response = await api.post('/Usuario', {
          nombre: nuevoUsuario.nombre,
          correoElectronico: nuevoUsuario.correoElectronico,
          contrasena: ContraHasheada,
          rol: nuevoUsuario.rol,
        });

        if (response.status === 200) {
          console.log('Usuario registrado exitosamente');
        } else {
          console.error('Error al registrar usuario:', response.statusText);
          throw new Error('Error al registrar usuario: ' + response.statusText); 
        }
      } catch (error) {
        console.error('Error al registrar usuario:', error);
        throw error; 
      }
    },
    logout() {
      this.logueado = false;
      this.currentUser = null;
      localStorage.removeItem('logueado');
      localStorage.removeItem('currentUser');
    },
  },
});