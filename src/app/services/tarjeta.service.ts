import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TarjetaVideo } from '../models/tarjeta-video';

@Injectable({ providedIn: 'root' })
export class TarjetaService {
  private readonly API_URL = 'http://localhost:5270/api/tarjetas';

  constructor(private http: HttpClient) {}

  getTarjetas(): Observable<TarjetaVideo[]> {
    return this.http.get<TarjetaVideo[]>(this.API_URL);
  }

  getTarjeta(id: number): Observable<TarjetaVideo> {
    return this.http.get<TarjetaVideo>(`${this.API_URL}/${id}`);
  }

  crear(tarjeta: Omit<TarjetaVideo, 'id'>): Observable<TarjetaVideo> {
    return this.http.post<TarjetaVideo>(this.API_URL, tarjeta);
  }

  actualizar(id: number, tarjeta: TarjetaVideo): Observable<TarjetaVideo> {
    return this.http.put<TarjetaVideo>(`${this.API_URL}/${id}`, tarjeta);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
