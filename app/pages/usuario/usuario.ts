import { Component, OnInit, Input, ViewChild} from '@angular/core';
import {NavController, MenuController, Toast} from 'ionic-angular';
import {Usuario, Group, User} from './usuario.model';

import {MaterializeDirective} from "../../materialize-directive";
import {Validator} from "validator.ts/Validator";
import { Http, Headers } from '@angular/http';
import {UsuarioService} from './usuario.service';
import {Url} from '../../url';


@Component({
    templateUrl: 'build/pages/usuario/usuario.html',
    directives: [MaterializeDirective],
    providers: [UsuarioService],
})

export class UsuarioPage implements OnInit {
    url = new Url();

    title: string = 'Usuarios';
    usuarios: Usuario[];
    template: string = 'null';
    @Input()
    usuarioModificar= new Usuario;
    Tipo = '';
    count = 10;
    id = 0;
    usuariosEliminar: Usuario[] = [];
    tipos: Group[];

    tiposBusquedas = ['email', 'nombre'];
    busqueda = { tipoB: 'email', valor: '' };

    @Input()
    usuarioNuevo = new Usuario();

    @Input()
    credenciales = {
        clave: '', clave2: ''
    }





    constructor(private navController: NavController,
        private menu: MenuController,
        private usuarioService: UsuarioService,
        private http: Http) {
        //this.usuariosTemporal = this.usuarios;

    }
    openMenu() {
        this.menu.open();
    }

    presentToast(text: string) {
        let toast = Toast.create({
            message: text,
            duration: 3000
        });

        toast.onDismiss(() => {
            console.log('Dismissed toast');
        });
        this.navController.present(toast);
    }
    listar() {
        this.usuarioService.getUsuarios().then(usuarios => { this.usuarios = usuarios; return usuarios }).then(usuarios => {
            for (var usuario of this.usuarios) {
                this.usuarioService.llenarTipo(usuario);
            }
        })
        return this.usuarios
    }
    crear() {

        let validator = new Validator();

        if (!validator.isValid(this.usuarioNuevo)) this.presentToast('Corrija el formulario');
        else if (this.credenciales.clave == '') this.presentToast('Clave vacia');
        else if (this.credenciales.clave.length < 6) this.presentToast('Clave menor a 6 caracteres');
        else if (this.credenciales.clave != this.credenciales.clave2) this.presentToast('Claves no coinciden');
        else if (this.Tipo == '') this.presentToast('Tipo no definido');
        else {

            this.usuarioNuevo.Usuario = new User();
            this.usuarioNuevo.Usuario.username = this.usuarioNuevo.Email;

            let tipo = this.tipos.find(tipo => this.Tipo == tipo.name);
            let usuario = JSON.parse(JSON.stringify(this.usuarioNuevo))
            usuario['Usuario']['groups'] = [tipo.url]
            this.usuarioService.createUsuario(usuario, this.credenciales).then(result => this.listar());
            this.template = 'null';
            this.usuarioNuevo = new Usuario();


        }
    }

    goModificar(usuario: Usuario) {
      console.log(usuario)
            this.usuarioModificar=JSON.parse(JSON.stringify(usuario))

            this.template='modificar'

    }
    modificar() {
      this.usuarioService.updateUsuario(this.usuarioModificar).then(result => this.listar());
      this.template='null'


    }
    eliminar() {

              for(var usuario of this.usuariosEliminar){
                this.usuarioService.eliminarUsuario(usuario).then(result =>
                  { console.log(result) }).catch(error=> console.log(error))
              }
              this.usuariosEliminar= Array<Usuario>();
              this.listar();
    }

    select(usuario: Usuario) {

        if (!this.usuariosEliminar.some(user => user == usuario)) {
            this.usuariosEliminar.push(usuario);
        }else {
            let index = this.usuariosEliminar.findIndex(x => x == usuario)
            this.usuariosEliminar.splice(index, 1)
        };

    }

    goCrearUsuario() {
        this.template = 'crear';
    }
    cancelar() {
        this.template = 'null';
    }

    buscar() {
      if(this.busqueda.valor.trim() != ""){
      this.usuarioService.getBuscar(this.busqueda.valor).then(usuarios => { this.usuarios = usuarios; return usuarios }).then(usuarios => {
          for (var usuario of this.usuarios) {
              this.usuarioService.llenarTipo(usuario);
          }
      })}
      else{this.listar()}
      return this.usuarios
    }

    public ngOnInit() {
        this.listar();
        this.usuarioService.getTipos().then(tipos => {
            this.tipos = tipos
        });
    }
}
