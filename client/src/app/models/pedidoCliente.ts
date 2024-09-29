export interface DetallePedidoCliente {
  productoNombre: string;
  cantidad: number;
  precio: number;
}

export interface PedidoCliente {
  id_Pedido?: number; // Puede ser opcional si se genera automáticamente
  id_Cliente: number;
  total: number;
  fecha?: Date; // Si lo tienes como parte del pedido
  detalle_pedido_cliente?: DetallePedidoCliente[]; // Asegúrate de que esta propiedad esté aquí
}

export interface Cliente {
  id_Cliente: number;         // ID del cliente
  nombre_Cliente: string;     // Nombre del cliente
  direccion_Cliente?: string; // Dirección del cliente (opcional)
  telefono_Cliente?: string;  // Teléfono del cliente (opcional)
  email_Cliente?: string;     // Email del cliente (opcional)
}
