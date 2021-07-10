import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthAzureService } from '../auth/services/auth/auth-azure.service';


@Injectable({
providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate {
    constructor(
        private authAzureService: AuthAzureService,
        private router: Router
    ) {}

    async canActivate(): Promise < boolean > {
        // Si se posee un id_token válido...
        if (await this.authAzureService.validateAuthFlow()) {
            return true;
        }
        // Si no se posee un id_token válido...
        console.warn('El id_token no es válido');
        this.authAzureService.signOut();
        this.router.navigateByUrl('/auth')
        return false;
    }
}
