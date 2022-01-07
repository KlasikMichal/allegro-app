import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, map } from 'rxjs';
import convertToBase64 from '../helpers/allegro.helper';
import AllegroTokenResponse from '../types/allegroTokenResponse';

@Injectable({
  providedIn: 'root',
})
export class AllegroService {
  private token!: string;
  private CLIENT_ID = '756ae7b71acd46aaafe219929e360901';
  private CLIENT_SECRET =
    'xSvWokOm3H6Y3M7UrY2GQeIVZKHBNMBABG0McLnxSkRVMk38tVKaOhmhhWm6gLvv';
  private REDIRECT_URL = 'http://localhost:4200/shop';
  private CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
  private ALLEGRO_API = `https://allegro.pl.allegrosandbox.pl/auth/oauth/authorize?response_type=code&client_id=${this.CLIENT_ID}&redirect_uri=${this.REDIRECT_URL}&promt=none`;

  constructor(private httpClient: HttpClient) {}

  public getAccessCode(): string {
    const pos = window.location.href.indexOf('code');
    if (pos === -1) {
      window.location.href = this.ALLEGRO_API;
    }
    const accessCode = window.location.href.substring(
      window.location.href.indexOf('code') + 5,
    );
    return accessCode;
  }

  public getToken() {
    const headers = {
      Authorization: `Basic ${convertToBase64(
        this.CLIENT_ID,
        this.CLIENT_SECRET,
      )}`,
    };
    const token = this.httpClient
      .post<AllegroTokenResponse>(
        `${
          this.CORS_PROXY
        }https://allegro.pl.allegrosandbox.pl/auth/oauth/token?grant_type=authorization_code&code=${this.getAccessCode()}&redirect_uri=http://localhost:4200/shop`,
        null,
        { headers },
      )
      .pipe(map((response) => response.access_token));
    return lastValueFrom(token);
  }

  public async getProducts() {
    let data: any;
    await this.getToken().then((data) => (this.token = data));
    const headers = {
      Authorization: `Bearer ${this.token}`,
      Accept: 'application/vnd.allegro.public.v1+json',
    };
    return this.httpClient.get<any>(
      `${this.CORS_PROXY}https://api.allegro.pl.allegrosandbox.pl/offers/listing?category.id=77917&phrase=laptop`,
      {
        headers,
      },
    );
  }
}
