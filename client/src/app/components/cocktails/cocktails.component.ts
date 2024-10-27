import { Component, OnInit } from '@angular/core';
import { CocktailService } from '../../services/services/services/cocktail.service';
import { Router } from '@angular/router'; // Asegúrate de importar Router
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cocktails',
  templateUrl: './cocktails.component.html',
  styleUrls: ['./cocktails.component.css']
})
export class CocktailsComponent implements OnInit {

  public cocktails: any[] = []; // Lista de cócteles
  public randomCocktail: any; // Cóctel aleatorio
  public searchTerm: string = ''; // Término de búsqueda
  public searchPerformed: boolean = false; // Bandera para saber si se hizo una búsqueda

  // Inyectamos Router en el constructor
  constructor(private cocktailService: CocktailService, private router: Router) { }

  ngOnInit(): void {
    this.getRandomCocktail(); // Obtener cóctel aleatorio al cargar la página
  }

  // Método para buscar cócteles por nombre
  searchCocktails(): void {
    if (this.searchTerm.trim()) {
      this.getCocktails(this.searchTerm);
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Atención',
        text: 'Por favor, introduce un nombre de cóctel para buscar.',
        confirmButtonColor: '#5b3d99'
      });
    }
  }

  // Obtener cócteles por nombre
  getCocktails(name: string): void {
    this.cocktailService.getCocktailsByName(name).subscribe(
      data => {
        this.cocktails = data.drinks || []; // Asigna los cócteles obtenidos a la variable
        this.searchPerformed = true; // Indica que se realizó la búsqueda

        if (this.cocktails.length === 0) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se encontraron cócteles con ese nombre.',
            confirmButtonColor: '#5b3d99'
          });
        }
      },
      error => {
        console.error('Error al obtener los cócteles:', error);
        this.cocktails = []; // Limpia la lista en caso de error
      }
    );
  }

  // Obtener un cóctel aleatorio
  getRandomCocktail(): void {
    this.cocktailService.getRandomCocktail().subscribe(
      data => {
        this.randomCocktail = data.drinks[0]; // Almacena el cóctel aleatorio
        console.log('Cóctel aleatorio:', this.randomCocktail);
      },
      error => {
        console.error('Error al obtener el cóctel aleatorio:', error);
      }
    );
  }

  // Método para extraer los ingredientes del cóctel
  getIngredients(cocktail: any): string[] {
    const ingredients: string[] = [];
    for (let i = 1; i <= 15; i++) { // Hay hasta 15 posibles ingredientes
      const ingredient = cocktail[`strIngredient${i}`];
      const measure = cocktail[`strMeasure${i}`];
      if (ingredient) {
        ingredients.push(measure ? `${measure} ${ingredient}` : ingredient);
      }
    }
    return ingredients;
  }

  // Método para manejar el cierre de sesión o regresar al login
  logout() {
    // Redirige al usuario a la página de inicio de sesión
    this.router.navigate(['/login']);
  }
}
