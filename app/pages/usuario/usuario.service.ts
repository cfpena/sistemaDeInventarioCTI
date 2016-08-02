import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Usuario } from './usuario.model';
import {Url} from '../../url';
@Injectable()
export class UsuarioService {
  url= new Url();
  constructor(private http: Http) {}
  getUsuarios() {
    return this.http
               .get(this.url.base + this.url.usuario)
               .map((r: Response) => r.json().data as Usuario[]);
  }
}
