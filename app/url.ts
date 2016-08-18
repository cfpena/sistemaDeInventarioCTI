import {Headers} from '@angular/http';
export class Url {
  base ='http://127.0.0.1:8000/';
  usuario ='api/usuarios/';
  persona ='api/personas/';
  item ='api/items/';
  kit ='api/kits/';
  token = 'api-token-auth/';
  verifyToken= 'api-token-verify/';
  tiposUsuarios = 'api/groups/';
  header= new Headers();
  password= 'api/password/';
  buscar = '?search='
  constructor() {
    this.header.append('Content-Type','application/json')
    this.header.append('Accept','application/json')
  }
}
