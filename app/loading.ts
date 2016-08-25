import {NavController, Loading,MenuController, Toast} from 'ionic-angular';

export class Load{
loading = Loading.create({
   spinner: 'hide',
content: `
<div materialize class="preloader-wrapper big active">
  <div class="spinner-layer spinner-blue">
    <div class="circle-clipper left">
      <div class="circle"></div>
    </div><div class="gap-patch">
      <div class="circle"></div>
    </div><div class="circle-clipper right">
      <div class="circle"></div>
    </div>
  </div>

  <div class="spinner-layer spinner-red">
    <div class="circle-clipper left">
      <div class="circle"></div>
    </div><div class="gap-patch">
      <div class="circle"></div>
    </div><div class="circle-clipper right">
      <div class="circle"></div>
    </div>
  </div>

  <div class="spinner-layer spinner-yellow">
    <div class="circle-clipper left">
      <div class="circle"></div>
    </div><div class="gap-patch">
      <div class="circle"></div>
    </div><div class="circle-clipper right">
      <div class="circle"></div>
    </div>
  </div>

  <div class="spinner-layer spinner-green">
    <div class="circle-clipper left">
      <div class="circle"></div>
    </div><div class="gap-patch">
      <div class="circle"></div>
    </div><div class="circle-clipper right">
      <div class="circle"></div>
    </div>
  </div>
</div>

`
});

constructor(){};

present(nav: NavController){
 return  nav.present(this.loading);

}
dismiss(){
  return this.loading.dismiss();
}



}
