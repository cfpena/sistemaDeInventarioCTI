import {Headers} from '@angular/http';
export class Url {
  base ='http://162.243.83.72/';

  usuario ='api/usuarios/';
  persona ='api/prestador/';
  prestamo ='api/prestamos/';
  elemento ='api/elementos/';
  acta ='api/actas/';
  devolucion ='api/devoluciones/';
  dispositivo = 'api/dispositivos/';
  kit ='api/kits/';
  kitelemento='api/kitelemento/';
  token = 'api-token-auth/';
  verifyToken= 'api-token-verify/';
  tiposUsuarios = 'api/grupos/';
  password= 'api/password/';
  buscar = '?search='
  reporteInventario = 'api/reporteinventario/'
  reportePrestamo = 'api/reporteprestamo/'
  movimientoDetalleElemento ='api/ingresosegresoselementos/'
  movimientoDetalleDispositivo ='api/ingresosegresosdispositivos/'
  movimiento = 'api/facturaingreso/'


}
