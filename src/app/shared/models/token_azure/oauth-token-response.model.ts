export interface OAuthTokenResponse {
    access_token?: string;
    expires_in?: number;
    ext_expires_in?: number;
    id_token: string;
    scope?: string;
    token_type?: string;
    refresh_token?: string;
    error?: string;
    error_description?: string;
  }
  