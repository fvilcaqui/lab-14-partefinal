/**
 * Esta función muestra un formulario de login (para fetch)
 * El botón enviar del formulario deberá invocar a la función doLogin
 * Modifica el tag div con id main en el html
 */
function showLogin(){
let html=
  `
  <h1>Ingresar Usuario</h1>
  <ul>
    <li>
     <label for="Usuario">Nombre de Usuario:</label> 
     <input type="text" name="usuario" id="usuario"><br>
    </li>
    <li>
      <label for="Contrasena">Contraseña:</label>
      <input type="text" name="contrasena" id="contrasena"><br>
     </li>
   </ul>
     <button onclick=''>Enviar</button></br>
   `;
    document.getElementById('main').innerHTML = html;
}

/**
 * Esta función recolecta los valores ingresados en el formulario
 * y los envía al CGI login.pl
 * La respuesta del CGI es procesada por la función loginResponse
 */
function doLogin(){
  var usuario = document.getElementById("usuario").value;
  var contrasena = document.getElementById("contrasena").value;
  var url =  "../cgi-bin/login.pl?owner="+usuario+"&password="+contrasena;
  var promise = fetch(url);
  promise.then(response => response.text())
  .then(data => {
    var xml = (new window.DOMParser() ).parseFromString(data, "text/xml");
    loginResponse(xml);
    console.log(xml);
  }).catch(error => {
    console.log("Error:",error);   
  });
}

/**
 * Esta función recibe una respuesta en un objeto XML
 * Si la respuesta es correcta, recolecta los datos del objeto XML
 * e inicializa la variable userFullName y userKey (e usuario)
 * termina invocando a la funcion showLoggedIn.
 * Si la respuesta es incorrecta, borra los datos del formulario html
 * indicando que los datos de usuario y contraseña no coinciden.
 */
function loginResponse(xml){
  var userFullName = xml.getElementById("firstName")+xml.getElementById("lastName");
  var userKey = xml.getElementById("owner");
    if(userFullName!=null && userKey!=null){
      ShowLoggedIn();
    }else{
      console.log("Datos no coinciden");
    }
}
/**
 * esta función usa la variable userFullName, para actualizar el
 * tag con id userName en el HTML
 * termina invocando a las functiones showWelcome y showMenuUserLogged
 */
  function showLoggedIn(){
  document.getElementById('userName').innerHTML = userFullName;
  let html = '<h1>Se reconocio al usuario</h1>';
  showWelcome();
  showMenuUserLogged();
  }
/**
 * Esta función crea el formulario para el registro de nuevos usuarios
 * el fomulario se mostrará en tag div con id main.
 * La acción al presionar el bontón de Registrar será invocar a la 
 * función doCreateAccount
 */
  function showCreateAccount(){
  let HTML =  `
         <h1>Crear un Nuevo Usuario</h1>
         <label for='userName'>Usuario: </label>
         <input type='text' name='userName' id='userName'></br>
         <label for='password'>Contraseña: </label>
         <input type='text' name='password' id='password'></br>
         <label for='firstName'>Nombre: </label>
         <input type='text' name='firstName' id='firstName'></br>
         <label for='lastName'>Apellido: </label>
         <input type='text' name='lastName' id='lastName'></br>
         <div class="main">
         <button onclick="doCreateAccount()">Registrar</button></br>
         </div>
         <script>
         doCreateAccount();
         </script> `
      document.getElementById('main').innerHTML = HTML;
  }

/* Esta función extraerá los datos ingresados en el formulario de
 * registro de nuevos usuarios e invocará al CGI register.pl
 * la respuesta de este CGI será procesada por loginResponse.
 */
function doCreateAccount(){
  var usuario = document.getElementById("userName").value;
  var contrasena = document.getElementById("password").value;
  var firstName = document.getElementById("firstName").value;
  var lastName = document.getElementById("lastName").value;
  var url = "../ProyectoFinal/cgi-bin/register.pl?userName="+usuario+"&password="+contrasena+"&firstName="+firstName+"&lastName="+lastName;
  var promise = fetch(url);
  promise.then(response => response.text())
  .then(data => {
    var xml = (new window.DOMParser()).parseFromString(data, "text/xml");
     loginResponse(xml);
     console.log(xml);
  }).catch(error => {
     console.log("Error:",error);   
  });
}

/*
 * Esta función invocará al CGI list.pl usando el nombre de usuario 
 * almacenado en la variable userKey
 * La respuesta del CGI debe ser procesada por showList
 */
function doList(){
  var userKey;
  var url = "../ProyectoFinal/cgi-bin/list.pl?user="+userKey;
  var promise = fetch(url);
  promise.then(response => response.text())
  .then(data => {
    var xml = (new window.DOMParser()).parseFromString(data, "text/xml");
      showList(xml);
      console.log(xml);
    }).catch(error => {
      console.log("Error:",error);   
   });
}

/**
 * Esta función recibe un objeto XML con la lista de artículos de un usuario
 * y la muestra incluyendo:
 * - Un botón para ver su contenido, que invoca a doView.
 * - Un botón para borrarla, que invoca a doDelete.
 * - Un botón para editarla, que invoca a doEdit.
 * En caso de que lista de páginas esté vacia, deberá mostrar un mensaje
 * indicándolo.
 */
  function showList(xml){
    var list = xml.getElementsByTagName('title');
    let html = '<ul>';
    if(xml.textContent = null){
      html += "la lista esta vacia";
    }
    for(let i=0;i<list.lenght;i++){
       html += `
             <li> list[0] 
            <button onclick="doView()">Ver</button>
            <button onclick="dodelete()">Eliminar</button>
            <button onclick="doEdit">Editar</button>
        `;
      }

  }

/**
 * Esta función deberá generar un formulario para la creación de un nuevo
 * artículo, el formulario deberá tener dos botones
 * - Enviar, que invoca a doNew 
 * - Cancelar, que invoca doList
 */
 function showNew(){
   let html =  `
  <h1>Creacion de un nuevo articulo</h1>
  <label for="user">Usuario:</label>
  <input type="text" name="user" id="user"></br>
  <label for="title">Titulo:</label>
  <input type="text" name="title" id="title"></br>
  <label for="texto">Texto:</label>
  <input type="textTarea" name="texto" id="texto"></br>
  <div id='enviar'>
      <button onclick="doNew()">Enviar</button></br>
  </div>
  <div id='cancelar'>
      <button onclick="doList()">Cancelar</button></br>
  </div>
   `
  document.getElementById('main').innerHTML = html;
 }

/*
 * Esta función invocará new.pl para resgitrar un nuevo artículo
 * los datos deberán ser extraidos del propio formulario
 * La acción de respuesta al CGI deberá ser una llamada a la 
 * función responseNew
 */
  function doNew(){
    var user = document.getElementById("user").value;
    var title = document.getElementById("title").value;
    var texto = document.getElementById("texto").value;
    var url = "../ProyectoFinal/cgi-bin/new.pl?user="+user+"&title="+title+"&text="+texto;
    var promise = fetch(url);
    promise.then(response=>response.text())
    .then(data=>{
      var xml = (new window.DOMParser()).parseFromString(data, "text/xml");
      responseNew(xml);
      console.log(xml);
     }).catch(error => {
       console.log("Error:",error);   
     });
  }

/*
 * Esta función obtiene los datos del artículo que se envían como respuesta
 * desde el CGI new.pl y los muestra en el HTML o un mensaje de error si
 * correspondiera
 */
function responseNew(response){
  var list = response.getElementsByTagName('articles');
  let html = "";
  if(xml.textContent = null){
    html += "Error";
  }
  html += `<h1>list<h1>`;""
}

/*
 * Esta función invoca al CGI view.pl, la respuesta del CGI debe ser
 * atendida por responseView
 */
  function doView(owner, title){
   var url = "../ProyectoFinal/cgi-bin/view.pl?owner="+owner+"&title="+title;
   var promise = fetch(url);
   promise.then(response => response.text())
  .then(data => {
     var response = (new window.DOMParser()).parseFromString(data, "text/xml");
     responseView(response);
     console.log(response);
   }).catch(error => {
     console.log("Error:",error);   
   });
}

/*
 * Esta función muestra la respuesta del cgi view.pl en el HTML o 
 * un mensaje de error en caso de algún problema.
 */
  function responseView(response){
   var list = response.getElementsByTagName('articles');
    let html = "";
    if(xml.textContent = null){
       html += "Error";
    }
    html += `<h1>list<h1>`;
 }

/*
 * Esta función invoca al CGI delete.pl recibe los datos del artículo a 
 * borrar como argumentos, la respuesta del CGI debe ser atendida por doList
 */
  function doDelete(owner, title){
    var url = "../ProyectoFinal/cgi-bin/delete.pl?user="+owner+"&title="+title;
    var promise = fetch(url);
    promise.then(response=>response.text())
    .then(data=>{
          doList();
     }).catch(error=>{
       console.log("Error:",error);   
     });
 }

/*
 * Esta función recibe los datos del articulo a editar e invoca al cgi
 * article.pl la respuesta del CGI es procesada por responseEdit
 */
  function doEdit(owner, title){
    var url = "../ProyectoFinal/cgi-bin/article.pl?userName="+owner+"&title="+title;
    var promise = fetch(url);
    promise.then(response => response.text())
    .then(data => {
      var response = (new window.DOMParser()).parseFromString(data, "text/xml");
      responseEdit(xml);
      console.log(response);
    }).catch(error=>{
      console.log("Error:",error);   
    });
  }

/*
 * Esta función recibe la respuesta del CGI data.pl y muestra el formulario 
 * de edición con los datos llenos y dos botones:
 * - Actualizar que invoca a doUpdate
 * - Cancelar que invoca a doList
 */
  function responseEdit(xml){
   var title = response.getElementsByTagName('title');  
   var text = response.getElementsByTagName('text');  
   let html = `
         <h1> $titulo </h1>
         <label for="texto"> title </label>
         <textarea id="msg" name="texto" rows="15" cols="35" id ='texto'>text</textarea>
         <div id='enviar'>
         <button onclick="doUpdate()">Actualizar</button>
         </div>
         <div id='cancelar'>
         <button onclick="doList()">Cancelar</button>
        </div>`
  }
/*
 * Esta función recibe el título del artículo y con la variable userKey y 
 * lo llenado en el formulario, invoca a update.pl
 * La respuesta del CGI debe ser atendida por responseNew
 */
  function doUpdate(title){
    var userKey = document.getElementById("userkey").value;
    var url = "../ProyectoFinal/cgi-bin/update.pl?owner="+userKey+"&title="+title;
    var promise = fetch(url);
    promise.then(response=>response.text())
    .then(data=>{
      var response = (new window.DOMParser()).parseFromString(data, "text/xml");
      responseNew(response);
      console.log(response);
     }).catch(error=>{
       console.log("Error:",error);   
     });
  }
