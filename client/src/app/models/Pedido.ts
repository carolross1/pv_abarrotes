// models/Pedido.ts
export type PedidoCreacion = Omit<PedidoProveedor, 'id_Pedido'>;

// models/Pedido.ts
export interface PedidoProveedor {
  id_Pedido?: number;
  id_Proveedor: number;
  fecha: Date;
  total: number;
  correo?: string;
  estado?:string;
  detalles: DetallePedido[];
}


export interface DetallePedido {
  id_Detalle?: number; // ID autoincremental, opcional
  codigo_Barras:number
  id_Pedido: number; // Relacionado con el pedido
  id_Producto: number; // Relacionado con el producto
  nombre: string;
  cantidad: number; // Cantidad del producto
  precio: number; // Total de la compra de este producto
}
