function signup_emp() {
   $("#boxactivo").val("signup_emp")
   $.get("/static/newEmpresa.html", function(htmlexterno){
        $("#marcocentro").html(htmlexterno);
   });
   $("#password_gest").hide();
   $("#marcocentro").show();
}
//===================================================================================================================
function abrir_signup() {
   $("#boxactivo").val("signup")
   $.get("/static/signup.html", function(htmlexterno){
        $("#marcocentro").html(htmlexterno);
   });
   $("#password_gest").hide();
   $("#marcocentro").show();
}
//===================================================================================================================
function etiqueta_empresario() {
   var texto= "Los empresarios podrán entrar en la aplicación para usar las diferentes opciones "+
   "que les permiten registrar su empresa y los datos de sus departamentos y delegaciones. También podrán colgar solicitudes o peticiones de "+
   "profesionales que serán leídas por los que reúnan los requisitos marcados y podrán acceder a los CV que dichos "+
   "profesionales enviarán en respuesta a las solicitudes."
   ver_informacion(texto);
}
//===================================================================================================================
function etiqueta_gestor() {
   var texto= "El Gestor tiene su propia contraseña y acceso a todas las fichas, sean de empresas o de profesionales. "+
   "Su supervisión mantiene el funcionamiento adecuado de la plataforma y se encarga de atender las consultas de empresarios y profesionales, "+
   "así como de dar soporte técnico y corregir errores detectados. También asigna las claves de acceso a los empresarios para que puedan "+
   "gestionar en la plataforma todo aquello relacionado con su empresa que quieren que sea accesible a los profesionales."
   ver_informacion(texto);
}
//===================================================================================================================
function etiqueta_prof() {
   var texto= "Los profesionales que deseen usar la aplicación deben registrarse primero. Podrán tener acceso al listado de "+
   "empresas que solicitan profesionales y detalles de los requisitos que se piden. También podrán enviar sus CV en respuesta a la "+
   "solicitud o solicitudes que escojan y ver si tienen respuesta de las empresas a las que han escrito."
   ver_informacion(texto);
}
//===================================================================================================================
function ver_informacion(param)  {
   $("#marcoright").hide();
   $("#marcoright").text(param);
   $("#marcoright").show();
}
//===================================================================================================================
function cerrar_marcos() {
    $("#marcoright").hide();
}
//===================================================================================================================
function acceso_gest(param) {
    $("#marcocentro").hide()
    etiqueta="Control de acceso "+param
    $.get("/static/acceso.html", function( data ){
         $("#password_gest").html( data);
         $("#loger").val(param)
         $("#password_gest")
            .find( "h2" )
            .eq( 0 )
            .html( etiqueta );
       });
       $("#password_gest").show();
}
//===================================================================================================================
function validar_clave(param) {
   $("#bottom").hide()
   switch(param) {
      case 'Gestor':
         valid_gestor()
         break
      case 'Empresario':
         valid_usuario(param)
         break
      case 'Profesional':
         valid_usuario(param)
         break
   }
}
//===================================================================================================================
function valid_gestor() {
    var clave="GIMPROFGMT";
	var form = document.forms["pass_acceso"];
	var errores = "";
	var retorno = true;

	form["pass_emp"].className = "";

	if(form["pass_emp"].value.trim() == "" || form["pass_emp"].value !=clave ) {
        errores += "La contraseña está vacía o no es una contraseña válida"
		form["pass_emp"].className = "inputError"
		form["pass_emp"].focus()
		retorno = false;
    }

	if(!retorno) {
	    document.getElementById("errores_acceso").innerHTML = errores
	    document.getElementById("errores_acceso").style.display = "block"
	} else {

    //    $("#check_pass").click(function(){
    //       $("#password_gest").hide();
    //    });
	//    cargar_empresas('GESTOR','Todas');
	    opciones_gestor();
	}
}
//===================================================================================================================
function opciones_gestor(){
    $("#marcocentro").hide()
    etiqueta="Opciones del Gestor"
    $.get("/static/opciones.html", function( data ){
         $("#password_gest").html( data);
         $("#password_gest")
            .find( "h2" )
            .eq( 0 )
            .html( etiqueta );
       });
       $("#password_gest").show();
}

//===================================================================================================================
function valid_usuario(usuario) {
	var form = document.forms["pass_acceso"];
	var errores = "";
	var retorno = true;
	form["pass_emp"].className = "";

	if(form["pass_emp"].value.trim() == "") {
        errores += "La contraseña está vacía"
		form["pass_emp"].className = "inputError"
		form["pass_emp"].focus()
		retorno = false;
    }
	if(!retorno) {
	    document.getElementById("errores_acceso").innerHTML = errores
	    document.getElementById("errores_acceso").style.display = "block"
	} else {
	    clave=form["pass_emp"].value.trim()
	    if(usuario=='Profesional') {
	         check_prof(clave)
	    } else {
	         check_clave_emp(clave)
	    }
	}
}
//===================================================================================================================
function check_prof(param)  {
    $.post("/checkprof", { clave: param })
       .done(function( data )  {
           $("#mensajes").empty()
           if(data[0]=='ERROR') {
              $("#mensajes").append(data[0]+"   "+data[1])
              $("#mensajes").delay(7000).show()
           } else {
              $("#bottom").hide()
              $("#password_gest").hide();
              $("#marcoleft").hide()
              $("#marcoright").hide()
              get_ficha(data)
           }
       },"json")
}
//===================================================================================================================
function get_ficha(datos)  {
      $.get("/static/profesional.html", function(htmlexterno){
         $("#marcoentero").html(htmlexterno);
            $("#codigo_prof").val(datos[0])
            $( "#fichaprof" )
                 .find( "label" )
                 .eq( 0 )
                 .html('Ficha de ' +datos[1] );
             $('#datos_prof').empty()
             $('#datos_prof').append('<tr><th style="width:25%">Nombre</th><td>' + datos[1] + '</td></tr>')
             $('#datos_prof').append('<tr><th>Nif</th><td>' + datos[5] + '</td></tr>')
             $('#datos_prof').append('<tr><th>Telefono</th><td>' + datos[3] + '</td></tr>')
             $('#datos_prof').append('<tr><th>Email</th><td>' + datos[2] + '</td></tr>')
             $('#datos_prof').append('<tr><th>Residencia</th><td>' + datos[4] + '</td></tr>')
             $("#curriculum").append(datos[6])
      });
}
//===================================================================================================================
function check_clave_emp(param)  {
    $.post("/checkclave", { clave: param })
       .done(function( data )  {
           $("#mensajes").empty()
           $("#mensajes").append(data[0]+"  "+data[1]+" "+data[2])
           $("#mensajes").delay(7000).show()
           if(data[0]!='ERROR') {
                 $("#check_pass").css('visibility','hidden')
                 $("#entrar").css('visibility','visible')
                 $("#entrar").click(function() {
                    cargar_empresas('EMPRESARIO',param)
                 })
           }
    },"json")
       .fail(function() {
          swal({title:"ERROR",text:'Ha fallado check_clave',icon:"error", button:"EXIT"})
       })
}
//===================================================================================================================
function cargar_empresas(modo,clave) {
     $("#password_gest").hide();
     $("#marcoleft").hide()
     $("#marcoright").hide()
     $.get("/static/empresas.html", function(data){
        $("#marcoentero").html(data);
        if(modo=='EMPRESARIO') {
            $(":button").css('visibility','hidden')
            $("#editar").css('visibility','visible')
        }
     });
     $.post("/get_empresas", {solicitante:modo, cod_clave:clave})
       .done(function( data ) {
          for (let i = 0; i < data.length; i++) {
               $('#cuadro_emp').append($('<option>').attr('value',data[i]).text(data[i][1]))
          }
       },"json")
       .fail(function() {
          swal({title:"ERROR",text:'Ha fallado cargar empresas',icon:"error", button:"EXIT"})
       })
}
//===================================================================================================================
function about_us() {
   $("#boxactivo").val("about")
   $("#marcoright").hide()
   $("#marcocentro").empty()
   $.get("/static/AboutUs.html", function(htmlexterno){
        $("#marcocentro").html(htmlexterno);
   });
   $("#password_gest").hide();
   $("#marcocentro").hide();
   $("#marcocentro").slideToggle(500,"linear");
}
//===================================================================================================================