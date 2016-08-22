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
  header= new Headers();
  password= 'api/password/';
  buscar = '?search='
  constructor() {
    this.header.append('Content-Type','application/json')
    this.header.append('Accept','application/json')
  }
}
