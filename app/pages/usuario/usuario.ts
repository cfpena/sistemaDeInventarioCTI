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
    //usuario temporal para mantener los datos para modificar
    @Input()
    usuarioModificar= new Usuario;
    Tipo = '';
    //lista de usuarios seleccionados por el checkbox para eliminar
    usuariosEliminar: Usuario[] = [];
    tipos: Group[];
    //valor del campo de busqueda
    busqueda = {valor: '' };
    //usuario temporal para crear un usuario
    @Input()
    usuarioNuevo = new Usuario();
    //variable que guarda las claves para el nuevo usuario
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
      //las promesas retornan promesas por lo tanto el resultado se debe tratar como una promesa, con el then y catch
        this.usuarioService.getUsuarios().then(usuarios => { this.usuarios = usuarios; return usuarios }).then(usuarios => {
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
            //se busca el tipo dentro de la lista de tipos por el nombre dado en el select de tipos al crear
            let tipo = this.tipos.find(tipo => this.Tipo == tipo.name);
            //se hace un doble parse para obtener el valor de la variable y no la referencia
            //si no se hace esto al moficiar el usuario nuevo, tambien se modifica el usuario viejo
            let usuario = JSON.parse(JSON.stringify(this.usuarioNuevo))
            usuario['Usuario']['groups'] = [tipo.url]
            this.usuarioService.createUsuario(usuario, this.credenciales).then(result => this.listar());
            this.template = 'null';
            //se vuelve a dejar en blanco el usuarioNuevo para volverlo  a usar luego
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
                  { this.listar() }).catch(error=> console.log(error))
              }
              //se deja en blanco la lista a eliminar
              this.usuariosEliminar= Array<Usuario>();
              //se refrescan los datos del servidor
              this.listar();
    }
    //funcion que agrega los usuarios a la lista para eliminarlos luego
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
    //funcion para realizar la busqueda
    buscar() {
      //si el valor es diferente de vacio entonces se manda a buscar, sino se listan los datos sin filtros
      if(this.busqueda.valor.trim() != ""){
      this.usuarioService.getBuscar(this.busqueda.valor).then(usuarios => { this.usuarios = usuarios; return usuarios }).then(usuarios => {
          for (var usuario of this.usuarios) {
              this.usuarioService.llenarTipo(usuario);
          }
      })}
      else{this.listar()}
      return this.usuarios
    }
    //funcion que se ejecuta al cargar la pagina
    public ngOnInit() {
      //se obtienen los usuarios para llenar la tabla y se obtienen los tipos de usuarioss
        this.listar();
        this.usuarioService.getTipos().then(tipos => {
            this.tipos = tipos
        });
    }
}
