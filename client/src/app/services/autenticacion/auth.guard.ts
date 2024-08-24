import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { switchMap, map, catchError } from 'rxjs';
import Swal from 'sweetalert2';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  return authService.isLoggedIn().pipe(
    switchMap(isLoggedIn => {
      if (isLoggedIn) {
        return authService.getUserType().pipe(
          map(userType => {
            const requiredType = route.data['tipo_Usuario'];
            if (requiredType && userType !== requiredType) {
              Swal.fire({
                icon: 'warning',
                title: 'Acceso Denegado',
                text: 'No tienes permisos para acceder a esta sección.',
                confirmButtonText: 'Aceptar'
              }).then(() => {
               
              });
              return false;
            }
            return true;
          }),
          catchError(() => authService.handleAuthRedirect())
        );
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'No Autenticado',
          text: 'Por favor, inicie sesión para acceder a esta página.',
          confirmButtonText: 'Aceptar'
        });
        return authService.handleAuthRedirect();
      }
    })
  );
};
