export interface DetalleVenta {
  id_Detalle?: number;
  id_Venta: string;
  id_Producto: number;
  cantidad:number;
  descuento?: number;        
  }