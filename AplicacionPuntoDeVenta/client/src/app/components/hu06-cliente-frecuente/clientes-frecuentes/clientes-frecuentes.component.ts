import { Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientes-frecuentes',
  templateUrl: './clientes-frecuentes.component.html',
  styleUrl: './clientes-frecuentes.component.css'
})
export class ClientesFrecuentesComponent{
  constructor(private router:Router){}
  ngOnInit(): void {
      
  }
 
  verListaClientes():void{
    this.router.navigate(['/listaclientesf']);
  }
}
