export interface AppConfig {
    production: boolean;
    productName: string;
    environment: string;
    environmentName: string;
    coreServiceUrl: string;
    xibmclientid: string;
    xibmclientsecret: string;
    azureAdTenantId: string;
    azureAdClientId: string;
    azureAdRedirectUri: string;
    ibmClientId: string;
    elkApmServer: string;
    elkApmDistributedTracingOrigins: string[];
    elkActive: boolean;
    elkInstrument: boolean;
  }
  