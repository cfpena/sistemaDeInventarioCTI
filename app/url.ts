import {Headers} from '@angular/http';
export class Url {
  base ='http://localhost:8000/';
  usuario ='api/usuarios/';
  token = 'api-token-auth/';
  verifyToken= 'api-token-verify';
  tiposUsuarios = 'api/groups/';
  header= new Headers();
  constructor() {
    this.header.append('Content-Type','application/json')
    this.header.append('Accept','application/json')
  }
}
