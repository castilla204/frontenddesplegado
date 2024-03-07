/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VUE_APP_URL_API: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }