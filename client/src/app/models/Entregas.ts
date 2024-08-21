export interface Entrega {
    id_Entrega: number;
    id_Proveedor: number;
    fecha: Date;
    total: number;
    id_Usuario?: string; // Asegúrate de incluir la propiedad aquí
  }
