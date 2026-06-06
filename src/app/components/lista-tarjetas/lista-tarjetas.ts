import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TarjetaService } from '../../services/tarjeta.service';
import { TarjetaVideo } from '../../models/tarjeta-video';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-lista-tarjetas',
  imports: [CurrencyPipe],
  templateUrl: './lista-tarjetas.html',
  styleUrl: './lista-tarjetas.css'
})
export class ListaTarjetasComponent implements OnInit {
  tarjetas = signal<TarjetaVideo[]>([]);
  filtroMarca = signal<string>('todas');

  constructor(private service: TarjetaService, private router: Router) {}

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.service.getTarjetas().subscribe(data => this.tarjetas.set(data));
  }

  get tarjetasFiltradas() {
    const f = this.filtroMarca();
    if (f === 'todas') return this.tarjetas();
    return this.tarjetas().filter(t => t.marca === f);
  }

  setFiltro(marca: string) {
    this.filtroMarca.set(marca);
  }

  verDetalle(id: number) {
    this.router.navigate(['/tarjeta', id]);
  }

  editar(id: number) {
    this.router.navigate(['/editar', id]);
  }

  eliminar(id: number) {
    if (!confirm('¿Seguro que quieres eliminar esta tarjeta?')) return;
    this.service.eliminar(id).subscribe(() => this.cargar());
  }

  nueva() {
    this.router.navigate(['/nueva']);
  }

  claseMarca(marca: string): string {
    return marca === 'NVIDIA' ? 'chip-nvidia' : 'chip-amd';
  }
}
