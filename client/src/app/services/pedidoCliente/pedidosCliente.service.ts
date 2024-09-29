// pedidosCliente.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PedidoCliente } from '../../models/pedidoCliente';

@Injectable({
    providedIn: 'root'
})
export class PedidosClienteService {
    private apiUrl = 'http://localhost:3000/pedidos';  // URL de tu API

    constructor(private http: HttpClient) { }

    // Crear un nuevo pedido
    createPedido(pedido: PedidoCliente): Observable<PedidoCliente> {
        return this.http.post<PedidoCliente>(this.apiUrl, pedido);
    }

    // Obtener todos los pedidos
    getPedidos(): Observable<PedidoCliente[]> {
        return this.http.get<PedidoCliente[]>(this.apiUrl);
    }

    // Actualizar un pedido
    updatePedido(id: number, pedido: PedidoCliente): Observable<PedidoCliente> {
        return this.http.put<PedidoCliente>(`${this.apiUrl}/${id}`, pedido);
    }

    // Eliminar un pedido
    deletePedido(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
