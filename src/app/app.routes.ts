import { Routes } from '@angular/router';
import { ListaTarjetasComponent } from './components/lista-tarjetas/lista-tarjetas';
import { TarjetaFormComponent } from './components/tarjeta-form/tarjeta-form';
import { TarjetaDetalleComponent } from './components/tarjeta-detalle/tarjeta-detalle';

export const routes: Routes = [
  { path: '', component: ListaTarjetasComponent },
  { path: 'nueva', component: TarjetaFormComponent },
  { path: 'editar/:id', component: TarjetaFormComponent },
  { path: 'tarjeta/:id', component: TarjetaDetalleComponent },
];
