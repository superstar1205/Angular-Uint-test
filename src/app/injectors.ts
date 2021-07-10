import { InjectionToken } from '@angular/core';
import { AppConfig } from './shared/models/App-config.model';


export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');
