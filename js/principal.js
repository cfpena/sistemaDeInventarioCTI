
function load_item(){
  document.getElementById("contenido").innerHTML='<object type="text/html" data="item.html" ></object>';
}

function load_user(){
  document.getElementById("contenido").innerHTML='<object type="text/html" data="crear_user.html" ></object>';
}

function limpiar()
{
  document.getElementById("contenido").innerHTML="";
}
