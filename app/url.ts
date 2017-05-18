 import {Headers} from '@angular/http';
export class Url {
  //base ='http://162.243.83.72/';
  //base= 'http://127.0.0.1:8001/'
  base='https://recursos.cti.espol.edu.ec:8000/'
  usuario ='api/usuarios/';
  persona ='api/prestador/';
  prestamo ='api/prestamos/';
  elemento ='api/elementos/';
  item = 'api/items/';
  itemupload = 'api/items/';
  acta ='api/actas/';
  devolucion ='api/devoluciones/';
  devuelto ='api/devuelto/';
  dispositivo = 'api/dispositivos/';
  kit ='api/kits/';

  kitDetalle='api/kitdetalle/';

  token = 'api-token-auth/';
  verifyToken= 'api-token-verify/';
  tiposUsuarios = 'api/grupos/';
  password= 'api/password/';
  buscar = '?search='
  reporteInventariopdf = 'api/reporteinventariopdf/'
  reporteInventario = 'api/reporteinventario/'
  reportePrestamopdf = 'api/reporteprestamopdf/'
  reportePrestamo = 'api/reporteprestamo/'
  reporteExistenciapdf = 'api/reporteexistenciapdf/'
  reporteExistencia = 'api/reporteexistencia/'
  movimientoDetalle ='api/ingresosegresos/'
  movimiento = 'api/facturaingreso/'
  apk='media/sictiandroid.apk'
  media="media/items/"


}
