import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, map } from 'rxjs';
import convertToBase64 from '../helpers/allegro.helper';
import AllegroTokenResponse from '../types/allegroTokenResponse';

@Injectable({
  providedIn: 'root',
})
export class AllegroService {
  private haveToken: Boolean = false;
  private token!: string;
  private CLIENT_ID: string = '7c241addc93f478cade905918b7ef333';
  private CLIENT_SECRET: string =
    'YJlOdfeSAqd0ShabrRFfqqJOimbKhIMREt2cXE051Ugv2S8u32AOhdl1fQLo7E7K'; //aplikacja testowa, więc CLIENT_SECRET zahardcododowany tutaj
  private REDIRECT_URL: string = 'http://localhost:4200/shop';
  private CORS_PROXY: string = 'https://cors-anywhere.herokuapp.com/';
  private ALLEGRO_API: string = `https://allegro.pl.allegrosandbox.pl/auth/oauth/authorize?response_type=code&client_id=${this.CLIENT_ID}&redirect_uri=${this.REDIRECT_URL}&promt=none`;

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

  public getToken(): Promise<string> {
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

  public async getProducts(phrase?: string) {
    if (this.haveToken === false) {
      await this.getToken().then((data) => (this.token = data));
    }
    this.haveToken = true;
    const headers = {
      Authorization: `Bearer ${this.token}`,
      Accept: 'application/vnd.allegro.public.v1+json',
    };
    return this.httpClient.get<any>(
      `${this.CORS_PROXY}https://api.allegro.pl.allegrosandbox.pl/offers/listing?phrase=${phrase}`,
      {
        headers,
      },
    );
  }
}
