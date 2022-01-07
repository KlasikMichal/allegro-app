export default interface AllegroTokenResponse {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  allegro_api: boolean;
  jti: string;
}
