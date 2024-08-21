export interface DetalleVenta {
  id_Detalle?: number; // ID del detalle de la venta, puede ser opcional si se genera automáticamente
  id_Venta: number; // ID de la venta asociada
  id_Producto: number; // ID del producto asociado
  descuento?: number; // Descuento aplicado, opcional
  cantidad: number; // Cantidad del producto
  total_venta?: number; // Total de la venta para este detalle, opcional
}
