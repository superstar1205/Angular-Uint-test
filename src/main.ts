import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { APP_CONFIG } from 'src/app/injectors';
import { AppConfig } from './app/shared/models/App-config.model';

if (environment.production) {
	enableProdMode();
}

async function main() {
	try {
		const data = await fetch(environment.baseHref + 'assets/configs/config.json');
		const appConfig: AppConfig = await data.json();

		////console.log('AppConfig ha cargado: ', appConfig);

		await platformBrowserDynamic([
			{ provide: APP_CONFIG, useValue: appConfig },
		]).bootstrapModule(AppModule);
	} catch (error) {
		console.error(error);
	}
}

main();