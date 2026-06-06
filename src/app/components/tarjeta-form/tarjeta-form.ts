import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TarjetaService } from '../../services/tarjeta.service';
import { TarjetaVideo } from '../../models/tarjeta-video';

@Component({
  selector: 'app-tarjeta-form',
  imports: [FormsModule],
  templateUrl: './tarjeta-form.html',
  styleUrl: './tarjeta-form.css'
})
export class TarjetaFormComponent implements OnInit {
  esEdicion = signal(false);
  id = signal<number | null>(null);

  tarjeta: Omit<TarjetaVideo, 'id'> = {
    nombre: '',
    marca: 'NVIDIA',
    precio: 0,
    vram: 8,
    tipoMemoria: 'GDDR6',
    descripcion: '',
    stock: 0,
    imagen: ''
  };

  marcas = ['NVIDIA', 'AMD'];
  tiposMemoria = ['GDDR6', 'GDDR6X', 'GDDR7'];

  constructor(
    private service: TarjetaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.esEdicion.set(true);
      this.id.set(Number(id));
      this.service.getTarjeta(Number(id)).subscribe(t => {
        const { id: _, ...resto } = t;
        this.tarjeta = resto;
      });
    }
  }

  guardar() {
    if (this.esEdicion() && this.id() !== null) {
      const tarjetaCompleta: TarjetaVideo = { id: this.id()!, ...this.tarjeta };
      this.service.actualizar(this.id()!, tarjetaCompleta).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.service.crear(this.tarjeta).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }

  cancelar() {
    this.router.navigate(['/']);
  }
}
