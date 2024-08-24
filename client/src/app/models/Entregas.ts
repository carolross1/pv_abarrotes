export interface Entrega {
    id_Entrega: number;
    id_Proveedor: number;
    id_Factura: number;
    fecha: Date;
    hora: String;
    total: number;
    id_Usuario?: string; // Asegúrate de incluir la propiedad aquí
  }
