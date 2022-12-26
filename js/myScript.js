/**
 * Esta función muestra un formulario de login (para fetch)
 * El botón enviar del formulario deberá invocar a la función doLogin
 * Modifica el tag div con id main en el html
 */
function showLogin(){
let html=  `
  <h1>Ingresar Usuario</h1>
     <label for="user">Nombre de Usuario:</label> 
     <input type="text" name="owner" id="owner"><br>

      <label for="text">Contraseña:</label>
      <input type="text" name="password" id="password"><br>
     <button onclick='doLogin()'>Enviar</button></br>
   `;
    document.getElementById('main').innerHTML = html;
}

/**
 * Esta función recolecta los valores ingresados en el formulario
 * y los envía al CGI login.pl
 * La respuesta del CGI es procesada por la función loginResponse
 */
function doLogin(){
  let usuario = document.getElementById("owner").value;
  let contrasena = document.getElementById("password").value;
  console.log(usuario)
  console.log(password)
  var url = "http://192.168.56.102/~alumno/ProyectoFinal/cgi-bin/login.pl?owner="+usuario+"&password="+contrasena;
  var promise = fetch(url);
  promise.then(response => response.text())
  .then(data => {
    var xml = (new window.DOMParser()).parseFromString(data, "text/xml");
    console.log(xml);
    loginResponse(xml);
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
  let camResp = xml.getElementsByTagName("user")[0].textContent;
  if(camResp != '\n'){
     let owner=xml.getElementsByTagName("owner")[0].textContent;
     let firstName=xml.getElementsByTagName("firstName")[0].textContent;
     let lastName=cml.getElementsByTagName("lastName")[0].textContent;
    userFullName = firstName+" "+lastName;
    userKey = owner;
    console.log(userFullName);
    console.log(userKey);
    console.log(owner);
    console.log(firstName);
    console.log(lastName);
    console.log(xml)
    showLoggedIn();
  }else{
    showLoggedIn();
    document.getElementById('cambio').innerHTML='Error';
  }
}
/**
 * esta función usa la variable userFullName, para actualizar el
 * tag con id userName en el HTML
 * termina invocando a las functiones showWelcome y showMenuUserLogged
 */
  function showLoggedIn(){
  document.getElementById('userName').innerHTML = userFullName;
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
  let html =  `
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
         </div>`;
      document.getElementById('main').innerHTML = html;
  }

/* Esta función extraerá los datos ingresados en el formulario de
 * registro de nuevos usuarios e invocará al CGI register.pl
 * la respuesta de este CGI será procesada por loginResponse.
 */
function doCreateAccount(){
  let usuario = document.getElementById("userName").value;
  let contrasena = document.getElementById("password").value;
  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
  let url = "http://192.168.56.102/~alumno/ProyectoFinal/cgi-bin/register.pl?userName="+usuario+"&password="+contrasena+"&firstName="+firstName+"&lastName="+lastName;
  let promise = fetch(url);
  promise.then(response => response.text())
  .then(data => {
    let xml = (new window.DOMParser()).parseFromString(data, "text/xml");
     console.log(xml);
     loginResponse(xml);
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
  let url = "../ProyectoFinal/cgi-bin/list.pl?user="+userKey;
  let promise = fetch(url);
  promise.then(response=>response.text())
  .then(data => {
    let xml = (new window.DOMParser()).parseFromString(data, "text/xml");
      console.log(xml);
      showList(xml);
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
    let list = "No contiene articulos";
    if(xml.getElementsByTagName('articles')[0].textContent != '\n'){
      let articles = xml.getElementsByTagName("article");
      list="<ul>\n";
      for(let i=0;i<articles.length;i++){
        let title = xml.getElementsByTagName('title')[i].textContent;
        let botones = `<button onclick= "doView"(userKey,'` + title+ `')">v</button>`+
                `<button onclick= "doEdit(userkey,'` + title+ `')">E</button>`+
                `<button onclick= "doDelete(userKey,'` + title+ `')">D</button>`;
            list+="<li>"+title+botones+"</li>"+"<br>";
      }
      list+="</ul>"
    }
document.getElemetById('main').innerHTML = list
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
  <label for="title">Titulo:</label>
  <input type="text" name="title" id="title"></br>
  <label for="texto">Texto:</label>
  <input type="textTarea" name="text" id="text"></br>
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
    let title = document.getElementById("title").value;
    let text = document.getElementById("text").value;
    console.log(userKey);
    text= encodeURIComponent(text);
    console.log(text);
    let url = "../ProyectoFinal/cgi-bin/new.pl?owner="+userKey+"&title="+title+"&text="+text;
    console.log(title);
    console.log(text)
    let promise = fetch(url);
    promise.then(response=>response.text())
    .then(data=>{
      let xml = (new window.DOMParser()).parseFromString(data, "text/xml");
      console.log(xml);
      responseNew(xml);
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
  let title = response.getElementsByTagName('title')[0].textContent;
  let text = response.getElementsByTagName('text')[0].textContent;
  let html = '<h1>' + title + "</h1>\n<pre>"+text+"</pre>";
  document.getElementById('main').innerHTML = html;
}

/*
 * Esta función invoca al CGI view.pl, la respuesta del CGI debe ser
 * atendida por responseView
 */
  function doView(owner, title){
   console.log(owner);
   console.log(title);
   let url = "../ProyectoFinal/cgi-bin/view.pl?owner="+owner+"&title="+title;
   let promise = fetch(url);
   promise.then(response => response.text())
  .then(data => {
     console.log(data);
     responseView(data);
   }).catch(error => {
     console.log("Error:",error);   
   });
}

/*
 * Esta función muestra la respuesta del cgi view.pl en el HTML o 
 * un mensaje de error en caso de algún problema.
 */
  function responseView(response){
    console.log(response);
    document.getElementById('main').innerHTML = response;
 }

/*
 * Esta función invoca al CGI delete.pl recibe los datos del artículo a 
 * borrar como argumentos, la respuesta del CGI debe ser atendida por doList
 */
  function doDelete(owner, title){
    let url = "../ProyectoFinal/cgi-bin/delete.pl?user="+owner+"&title="+title;
    let promise = fetch(url);
    promise.then(response=>response.text())
    .then(data=>{
       let response = (new window.DOMParser()).parseFromString(data, "text/xml");
       console.log(response);
       doList(response);
     }).catch(error=>{
       console.log("Error:",error);   
     });
    let html = '<h1>Pagina Eliminada</h1>';
    document.getElementById('main').innerHTML=html;
 }

/*
 * Esta función recibe los datos del articulo a editar e invoca al cgi
 * article.pl la respuesta del CGI es procesada por responseEdit
 */
  function doEdit(owner, title){
    let url = "../ProyectoFinal/cgi-bin/article.pl?owner="+userKey+"&title="+title;
    let promise = fetch(url);
    promise.then(response => response.text())
    .then(data => {
      let response = (new window.DOMParser()).parseFromString(data, "text/xml");
      console.log(response);
      responseEdit(response);
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
   let title = xml.getElementsByTagName('title')[0].textContent;  
   let text = xml.getElementsByTagName('text')[0].textContent;  
    console.log(title);
    console.log(text);
   let html = `
         <h1>`+title+ `</h1>
         <label for="texto"> title </label>
         <textarea id="msg" name="texto" rows="15" cols="35" id ='texto'>`+text+`</textarea>
         <div id='enviar'>
         <button onclick="doUpdate('`+title + `')">Actualizar</button><br>
         <div id='cancelar'>
         <button onclick="doList()">Cancelar</button><br>`;
    document.getElementById('main').innerHTML = html;
    text=encodeURIComponent(text);
  }
/*
 * Esta función recibe el título del artículo y con la variable userKey y 
 * lo llenado en el formulario, invoca a update.pl
 * La respuesta del CGI debe ser atendida por responseNew
 */
  function doUpdate(title){
    console.log(title);
    let texto = document.getElementById('text');
    text = encodeURIComponent(texto);
    let url = "../ProyectoFinal/cgi-bin/update.pl?owner="+userKey+"&title="+title+"&text="+text;
    let promise = fetch(url);
    promise.then(response=>response.text())
    .then(data=>{
      let xml = (new window.DOMParser()).parseFromString(data, "text/xml");
      console.log(xml);
      responseNew(xml);
     }).catch(error=>{
       console.log("Error:",error);   
     });
  }
