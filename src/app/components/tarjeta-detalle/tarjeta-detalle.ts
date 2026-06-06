import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { TarjetaService } from '../../services/tarjeta.service';
import { TarjetaVideo } from '../../models/tarjeta-video';

@Component({
  selector: 'app-tarjeta-detalle',
  imports: [CurrencyPipe],
  templateUrl: './tarjeta-detalle.html',
  styleUrl: './tarjeta-detalle.css'
})
export class TarjetaDetalleComponent implements OnInit {
  tarjeta = signal<TarjetaVideo | null>(null);

  constructor(
    private service: TarjetaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.getTarjeta(id).subscribe(t => this.tarjeta.set(t));
  }

  editar() {
    this.router.navigate(['/editar', this.tarjeta()?.id]);
  }

  volver() {
    this.router.navigate(['/']);
  }

  claseMarca(marca: string): string {
    return marca === 'NVIDIA' ? 'chip-nvidia' : 'chip-amd';
  }
}
