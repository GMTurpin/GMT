var cuadro_activeEmp=true;
function validateEmpress() {
     var form = document.forms["newEmpresa"]
     var errores = ""
     var retorno = true

     form["empresa"].className = ""
     form["nif"].className = ""
     form["director"].className = ""
     form["telefono"].className = ""
     form["email_emp"].className = ""

     if(form["empresa"].value.trim() == "") {
		errores += "<li><b>Empresa</b> es campo obligatorio"
		form["empresa"].className = "inputError"
		form["empresa"].focus()
		retorno = false;
	 }

	 if(form["nif"].value.trim() == "") {
		errores += "<li><b>NIF</b> es campo obligatorio"
		form["nif"].className = "inputError"
		form["nif"].focus()
		retorno = false;
	 }

	 if(form["director"].value.trim() == "") {
		errores += "<li><b>Director</b> es campo obligatorio"
		form["director"].className = "inputError"
		form["director"].focus()
		retorno = false;
	 }

	 if(form["telefono"].value.trim() == "") {
		errores += "<li><b>Telefono</b> es campo obligatorio"
		form["telefono"].className = "inputError"
		form["telefono"].focus()
		retorno = false;
	 }

	 if(form["email_emp"].value == "") {
        errores += "<li><b>Email</b> es campo obligatorio"
		form["email_emp"].className = "inputError"
		if(retorno) form["email_emp"].focus()
		retorno = false;
	 }

     if(!retorno) {
	    document.getElementById("errores_nuevaempresa").innerHTML = errores
	    document.getElementById("errores_nuevaempresa").style.display = "block"
	 }
 	 return(retorno);
}
//====================================================================================================================
function validateDepto() {
     var form = document.forms["gestion_deptos"]
     var errores=""
     var retorno = true

     form["Departamento"].className = ""
     form["Responsable"].className = ""
     form["Tel_depto"].className = ""

     if(form["Departamento"].value.trim() == "") {
		errores += "<li><b>Departamento</b> es campo obligatorio"
		form["Departamento"].className = "inputError"
		form["Departamento"].focus()
		retorno = false;
	 }
     if(form["Responsable"].value.trim() == "") {
		errores += "<li><b>Responsable</b> es campo obligatorio"
		form["Responsable"].className = "inputError"
		form["Responsable"].focus()
		retorno = false;
	 }
     if(form["Tel_depto"].value.trim() == "") {
		errores += "<li><b>Teléfono</b> es campo obligatorio"
		form["Tel_depto"].className = "inputError"
		form["Tel_depto"].focus()
		retorno = false;
	 }
     if(!retorno) {
	    document.getElementById("errores_newDepto").innerHTML = errores
	    document.getElementById("errores_newDepto").style.display = "block"
	 } else {
	     save_depto()
	 }
}
//====================================================================================================================
function abrir_newEmp() {
     $.get("/static/newEmpresa.html", function(htmlexterno){
        $("#recuadro").html(htmlexterno);
     });
     $("#recuadro").attr("style","width:50%")
}
//====================================================================================================================
function edit_emp(param)  {
   $.get("/static/newEmpresa.html", function(data){
       $("#recuadro").html(data);
       $( "#cuerpo" )
          .find( "h1" )
          .eq( 0 )
          .html("Ficha de empresa" );
       $("#empresa_submit").val('EDITAR')
   });

   $("#recuadro").attr("style","width:50%")
   $.post("/load_activ_emp", { company: param })
       .done(function(data)  {
           $("#empresa").val(data[1])
           $("#director").val(data[3])
           $("#email_emp").val(data[5])
           $("#nif").val(data[2])
           $("#telefono").val(data[4])
           $("#empresa_submit").click(function() {
                $(this).get(0).type = 'button';
                update_emp(data);
           })
    },"json")
}
//====================================================================================================================
function update_emp(datos_emp) {
    ref_emp = datos_emp[0]
    name_emp = $("#empresa").val()
    num_nif = $("#nif").val()
    name_dir = $("#director").val()
    num_tel = $("#telefono").val()
    email = $("#email_emp").val()
    $.post("/update_emp", {ref_comp:ref_emp, company:name_emp, elnif:num_nif, el_dir:name_dir, el_tel:num_tel, el_email:email })
       .done(function() {
          $("#recuadro").hide()
          $("#marcocentro").show()
       })
}
//====================================================================================================================
function validateDeleg() {
     var form = document.forms["gest_delegs"]
     var errores=""
     var retorno = true

     form["Zona"].className = ""
     form["Dirección"].className = ""
     form["Email_deleg"].className = ""
     form["Tfno_deleg"].className = ""
     form["Contacto"].className = ""

     if(form["Zona"].value.trim() == "") {
		errores += "<li><b>Zona</b> es campo obligatorio"
		form["Zona"].className = "inputError"
		form["Zona"].focus()
		retorno = false;
	 }

     if(form["Dirección"].value.trim() == "") {
		errores += "<li><b>Dirección</b> es campo obligatorio"
		form["Dirección"].className = "inputError"
		form["Dirección"].focus()
		retorno = false;
	 }

     if(form["Email_deleg"].value.trim() == "") {
		errores += "<li><b>Email</b> es campo obligatorio"
		form["Email_deleg"].className = "inputError"
		form["Email_deleg"].focus()
		retorno = false;
	 }

     if(form["Tfno_deleg"].value.trim() == "") {
		errores += "<li><b>Teléfono</b> es campo obligatorio"
		form["Tfno_deleg"].className = "inputError"
		form["Tfno_deleg"].focus()
		retorno = false;
	 }

     if(form["Contacto"].value.trim() == "") {
		errores += "<li><b>Contacto</b> es campo obligatorio"
		form["Contacto"].className = "inputError"
		form["Contacto"].focus()
		retorno = false;
	 }

     if(!retorno) {
	    document.getElementById("errores_newDeleg").innerHTML = errores
	    document.getElementById("errores_newDeleg").style.display = "block"
	 } else {
	     save_deleg()
	 }
}
//====================================================================================================================
function validateApply(ref_empresa,ref_deleg) {
     var form = document.forms["nuevapet"]
     var errores=""
     var retorno = true

     form["especialidad"].className = ""
     form["requisitos"].className = ""

     if(form["especialidad"].value.trim() == "") {
		errores += "<li><b>Especialidad</b> es campo obligatorio"
		form["especialidad"].className = "inputError"
		form["especialidad"].focus()
		retorno = false;
	 }

     if(form["requisitos"].value.trim() == "") {
		errores += "<li><b>Requisitos</b> es campo obligatorio"
		form["requisitos"].className = "inputError"
		form["requisitos"].focus()
		retorno = false;
	 } else {
		cadena=form["requisitos"].value.trim()
        if(cadena.length>255) {
            var exceso=cadena.length-255
            errores += "<li><b>Máximo 255 carácteres</b>, se sobrepasa en "+ exceso
            form["requisitos"].className = "inputError"
            form["requisitos"].focus()
            retorno = false;
        }
	 }

     if(!retorno) {
	    document.getElementById("errores_new_apply").innerHTML = errores
	    document.getElementById("errores_new_apply").style.display = "block"
	 } else {
	     save_apply(ref_empresa,ref_deleg)
	 }
}
//====================================================================================================================
function validate_clave() {
     var form = document.forms["nueva_clave"]
     var retorno = true
	 if(form["clave"].value.trim()=="" | form["clave"].value.trim()=="") {
		mensaje="No se admiten claves vacías"
		retorno = false;
	 }

	 if(form["clave"].value != form["conf_clave"].value) {
		mensaje="Las contraseñas no coinciden"
		retorno = false;
	 }

     if(!retorno) {
            $( "#confirmado" )
                 .find( "label" )
                 .eq( 0 )
                 .html( mensaje );
            $("#confirmado").css('display','block')
	 } else  {
	    fijar_clave($("#codigo_emp").val(),form["clave"].value)
	 }
}
//====================================================================================================================
function cuadro_emp_click(param)  {
    var arraycadenas=param.split(',')
    var cod=arraycadenas[0]
    var empresa=arraycadenas[1]
    $("#set_clave").prop("disabled", false)
    $("#codigo_emp").val(cod)
    $("#emp_selected").val(empresa)
    $("#cuadro_emp option[value='"+ empresa +"']").attr("selected",true);
    $("#datosEmp").slideDown("slow");
    $("#activ").show()
    $( "#actividad" )
         .find( "label" )
         .eq( 0 )
         .html( "Actividad de " + empresa );
    $("#saveActiv").attr("disabled","true")
    $.post( "/load_activ_emp", { company: cod })
       .done(function( data )  {
       $("#cuadroDatos").empty()
       $("#cuadroDatos").append("       NIF                 "+ data[2]+ "\n")
       $("#cuadroDatos").append("       Telefono        " + data[4] + "\n")
       $("#cuadroDatos").append("       Director        " + data[3] + "\n")
       $("#cuadroDatos").append("       Email             " + (data[5]==null ? " " : data[5]) )
       $("#activEmp").empty()
       $("#activEmp").append(data[6])
    },"json")
    .fail(function() {
        $("#cuadroDatos").empty()
        $("#activEmp").empty()
        swal({title:"ERROR",text:'Ha fallado mostrar actividad',icon:"error", button:"EXIT"})
    })

    $("#recuadro").attr("style","width:79%")
    $("#zona_izda").attr("style","width:40%;float:left")
     $.get("/static/Deptos.html", function(htmlexterno){
        $("#depEmp").html(htmlexterno);
     });

     $.get("/static/Delegs.html", function(htmlexterno){
        $("#delegs").html(htmlexterno);
     });
     $("#depEmp").show()
     $("#delegs").show()
}
//===================================================================================================================
function get_clave(ref_emp)  {
   $.post("/ver_clave", {c_emp:ref_emp})
     .done(function( data ) {
        muestra_clave(data)
     })
}
//===================================================================================================================
function muestra_clave(clave) {
    $("#datosEmp").hide();
    $("#activ").hide();
    $("#salir").css("visibility", "visible")
    $("#asignar_clave").empty()
    $.get("/static/verclave.html", function(data) {
         $("#asignar_clave").html(data);
            $( "#boxmensaje" )
               .find( "label" )
               .eq( 0 )
               .html( clave[1] );
            $( "#boxmensaje" )
               .find( "label" )
               .eq( 1 )
               .html( clave[0] );
         });
         $("#asignar_clave").show()
}
//===================================================================================================================
function ventana_clave() {
    $("#datosEmp").hide();
    $("#activ").hide();
    $("#salir").css("visibility", "visible")
    $.get("/static/setclave.html", function(htmlexterno){
        $("#asignar_clave").html(htmlexterno);
    });
    $("#asignar_clave").show()
}
//===================================================================================================================
function fijar_clave(cod_empresa,nueva_clave) {
    nombre_empresa = $("#emp_selected").val()
    $.post("/nueva_clave", { cod_company:cod_empresa, name_company:nombre_empresa, clave_nueva:nueva_clave})
       .done(function()  {
            $( "#confirmado" )
                 .find( "label" )
                 .eq( 0 )
                 .html( "Clave actualizada con éxito" );
       })
       .fail(function()  {
            $( "#confirmado" )
                 .find( "label" )
                 .eq( 0 )
                 .html( "No se ha podido actualizar la clave" );
       })
       $("#confirmado").css('display','block')
}
//===================================================================================================================
function cerrar_claves() {
    $("#salir").css("visibility", "hidden")
    $("#asignar_clave").hide()
    $("#datosEmp").show();
    $("#activ").show();
}
//===================================================================================================================
function borrar_empresa() {
    var cod = $("#codigo_emp").val()
    $("#cuadro_emp option:selected").remove()
    $("#datosEmp").hide()
    $("#activ").hide()
    $("#depEmp").hide()
    $("#delegs").hide()
    $("#recuadro").attr("style","width:40%")
    $("#zona_izda").attr("style","width:90%;float:left")
    $.post("/del_Empresa", { company: cod })
}
//===================================================================================================================
function save_activ()  {
    cod=$("#codigo_emp").val()
    actividad=$("#activEmp").val()
    $.post("/save_active_emp", { company: cod, business: actividad })
}
//===================================================================================================================
function ficha_depto(param)  {
    $("#Botones_Deptos").hide()
    if (param!=0) {
         $.get("/static/newDepto.html", function(htmlexterno){
            $("#depto_nuevo").html(htmlexterno);
         });
         $.post("/modify_depto", { depto: param })
           .done(function( data )  {
               $("#elim_depto").attr("style","width:25px; height:32px; float:right; border-radius:8px; cursor:pointer; visibility:visible;"+
                         "background-image:url('/static/imagenes/papelera.jpg')")
               $("#codigo_dep").val(data[0])
               $("#Departamento").val(data[2])
               $("#Responsable").val(data[3])
               $("#Tel_depto").val(data[4])
               $("#label_oculta").val("Ficha de Departamento")
               $( "#gestion_deptos" )
               .find( "h3" )
               .eq( 0 )
               .html( "Ficha de Departamento" );
         },"json")
    } else {
         $.get("/static/newDepto.html", function( data ) {
            $("#depto_nuevo").html( data);
            $("#label_oculta").val("Nuevo Departamento")
         });
    }
}
//===================================================================================================================
function save_depto() {
    modo=$("#label_oculta").val()
    codempre=$("#codigo_emp").val()
    cod_dep=$("#codigo_dep").val()
    depto=$("#Departamento").val();
    resp=$("#Responsable").val();
    tfno=$("#Tel_depto").val();
    cerrar_depto()
    if (modo=="Nuevo Departamento") {
       $.post("/save_depto", {company:codempre, departamento:depto, responsable:resp, telefono:tfno})
    } else {
       $.post("/update_depto", {codigo:cod_dep, departamento:depto, responsable:resp, telefono:tfno})
    }
    show_deptos()
}
//===================================================================================================================
function borrar_depto(param_cod) {
    $.post("/elim_depto", {codigo:param_cod})
    cerrar_depto()
}
//===================================================================================================================
function cerrar_depto() {
   $("#depto_nuevo").empty()
   $("#Botones_Deptos").show()
}
//===================================================================================================================
function show_deptos()  {
    cod=$("#codigo_emp").val()
    $('#tabla_deptos').empty()
    $.post("/load_deptos", {company:cod})
       .done(function(data) {
          $('#tabla_deptos').append('<tr><th style="width:38%">Departamento</th><th style="width:37%">Responsable</th><th style="width:20%">Tfno</th>'+
          '<th style="width:5%; padding-left:0%;"><img src="/static/imagenes/editar2.jpg" class="center" width=100% height=100%/></th></tr>')
          for (let i = 0; i < data.length; i++) {
               $('#tabla_deptos').append('<tr><td>'+ data[i][2] +'</td>'+ '<td>' + data[i][3] + '</td>' + '<td>' + data[i][4] +
                   '</td><td><input type=button style="height:16px; width:18px; font-size:80%; padding:1px" value="'+data[i][0] +'"'+
                   'data-toggle="tooltip" title="Abrir ficha de departamento" onclick="ficha_depto('+data[i][0]+')"></td></tr>')
          }
       },"json")
       .fail(function() {
          swal({title:"ERROR",text:'No hay departamentos que mostrar',icon:"error", button:"EXIT"})
    })
}
//===================================================================================================================
function nueva_deleg()  {
    $("#Botones_Deptos").hide()
     $.get("/static/newDeleg.html", function(htmlexterno){
        $("#deleg_nueva").html(htmlexterno);
     });
}
//===================================================================================================================
function save_deleg() {
    codempre=$("#codigo_emp").val()
    empresa=$( "#cuadro_emp option:selected" ).val();
    ciudad=$("#Zona").val();
    direccion=$("#Dirección").val();
    email=$("#Email_deleg").val();
    tfno=$("#Tfno_deleg").val();
    contt=$("#Contacto").val();
    cerrar_deleg()
    $.post("/save_deleg", {company:codempre, city: ciudad, address: direccion, eml: email, phone: tfno, persona: contt})
    $("#depEmp").empty()
    $("#delegs").empty()
     $.get("/static/Deptos.html", function(htmlexterno){
        $("#depEmp").html(htmlexterno);
     });
     $.get("/static/Delegs.html", function(htmlexterno){
        $("#delegs").html(htmlexterno);
     });
     $("#depEmp").show()
     $("#delegs").show()
}
//===================================================================================================================
function cerrar_deleg() {
   $("#deleg_nueva").empty()
}
//===================================================================================================================
function cargar_lista_delegs()  {
    codempre=$("#codigo_emp").val()
    $.post("/load_delegs", {company:codempre})
       .done(function(data) {
          for (let i = 0; i < data.length; i++) {
               $('#desp_Delegs').append('<option value=' +data[i][0] + '>' + data[i][2] + '</option>')
          }
       },"json")
       .fail(function() {
          alert('Ha fallado cargar_lista_delegs')
       })
}
//===================================================================================================================
function datos_deleg(param) {
    $("#lista_applys").hide()
    $("#confirmacion").css('display','none')
    if(param=='(ninguna)')  {
       $("#tabla_datos_deleg").empty()
    } else {
        $("#tabla_datos_deleg").show()
        $.post("/ver_deleg", {cod_deleg:param})
          .done(function(data) {
             $('#deleg_selected').val(data[0])
             $("#nombre_deleg").val(data[2])
             $('#tabla_datos_deleg').empty()
             $('#tabla_datos_deleg').append('<tr><th style="width:20%">Dirección</th><td>' + data[3] + '</td></tr>')
             $('#tabla_datos_deleg').append('<tr><th>Email</th><td>' + data[4] + '</td></tr>')
             $('#tabla_datos_deleg').append('<tr><th>Teléfono</th><td>' + data[5] + '</td></tr>')
             $('#tabla_datos_deleg').append('<tr><th>Contacto</th><td>' + data[6] + '</td></tr>')
          },"json")
          .fail(function() {
             swal('AVISO','Debe seleccionar una delegación','info')
          })
    }
}
//===================================================================================================================
function quitar_deleg(cod_deleg)  {
    $.post("/borrar_deleg", {cod_branch:cod_deleg})   // Se borrarán también las applys de esta deleg
       .done(function() {
          mensaje="Se eliminó la delegación y sus solicitudes"
          $( "#confirmacion" )
             .find( "label" )
             .eq( 0 )
             .html( mensaje );
       })
          .fail(function() {
             swal('FALLO','No se recibe el mensaje','error')
          })
       $("#confirmacion").css('display','block')
}
//===================================================================================================================
function nueva_peticion(cod_deleg,name_deleg)  {
     if(cod_deleg=='(ninguna)') {
          mensaje="Primero debe seleccionar una delegación"
          $( "#confirmacion" )
             .find( "label" )
             .eq( 0 )
             .html( mensaje );
              $("#confirmacion").css('display','block')
     } else {
         empresa=$( "#cuadro_emp option:selected" ).text()
         codempre=$("#codigo_emp").val()
         $.get("/static/Peticiones.html", function( data ){
            $("#boxnewpet").html( data );
            $("#labemp").text("Empresa      "+empresa)
            $("#labdeleg").text("Delegación    "+name_deleg)
            $("#cempresa").val(codempre)
            $("#cdeleg").val(cod_deleg)
         });
         $("#cuadroDelegs").hide()
         $("#boxnewpet").show()
     }
}
//===================================================================================================================
function save_apply(param_codempresa, param_cod_deleg) {
    ref_empresa=param_codempresa
    codigo_deleg=param_cod_deleg
    especialidad=$( "#especialidad").val();
    requisitos=$( "#requisitos").val();
    cerrar_apply()
    $.post("/save_apply", {company:ref_empresa, branch:codigo_deleg, specialty:especialidad, requist:requisitos})
}
//===================================================================================================================
function cerrar_apply() {
   $("#boxnewpet").hide()
   $("#cuadroDelegs").show()
}
//===================================================================================================================
function datos_applys() {
    empresa=$( "#cuadro_emp option:selected" ).text()
    $.get("/static/ApplyRegs.html", function( data ){
        $("#box_lista_applys").html( data);
        $("#labempresa").text("Empresa     "+empresa)
        $("#cuadroDelegs").hide()
        $("#box_lista_applys").show()
    });
    codempre=$("#codigo_emp").val()
    $.post("/peticiones", {company:codempre})
      .done(function(data) {
         if(data.length==0) {
             mensaje="No hay solicitudes cursadas"
             $("#mensajes")
                 .find( "label" )
                 .eq( 0 )
                 .html( mensaje );
             $("#mensajes").css('display','block')
         } else {
             $('#tabla_aps').append('<tr><th>Código</th><th>Delegacion</th><th>Especialidad</th></tr>')
             for (let i=0; i < data.length; i++) {
                   var celda="celda"+i
                   var botcod="botcod"+i
                   $('#tabla_aps').append('<tr><td id='+celda+'><input id='+botcod+' type=button style="height:16px; width:21px; font-size:80%; padding:1px"'+
                   'value="'+ data[i][0] + '"' + 'onclick="cambia_color(this.id), ver_detalles(' + data[i][0] + ')"></td><td>' + data[i][6] + '</td><td>' + data[i][3] +'</td></tr>')
             }
         }
      },"json")
      .fail(function() {
         swal('AVISO','No hay solicitudes de esta delegación','info')
    })
}
//===================================================================================================================
function cambia_color(param)  {
     $("#tabla_aps td").each(function(){
        $(this).css("backgroundColor","white")
     })
     indice = document.getElementById(param).parentNode.parentNode.rowIndex;
     for(let i=0; i<3; i++) {
         celda=(document.getElementById("tabla_aps").rows[indice].cells[i]);
         celda.style.backgroundColor="#FFE4C4"
     }
}
//===================================================================================================================
function ver_detalles(param)  {
    $.post("/ver_detalles", {cod_apply:param})
      .done(function(data) {
         $('#detail_apply').empty()
         $('#detail_apply').show()
         $('#detail_apply').append(data[4])
      },"json")
      .fail(function() {
         alert('Ha fallado. No hay detalles')
      })
}
//===================================================================================================================
function res_prof()  {
    laempresa = $("#codigo_emp").val()
    empresa=$( "#cuadro_emp option:selected" ).text()
    delegacion=$("#nombre_deleg").val()
    vardeleg=$("#deleg_selected").val()
    $.get("/static/marcasprof.html", function( data ){
        $("#box_marcas_prof").html( data);
        $("#box_marcas_prof").css('display','block')
        $( "#etiq_marcas" )
             .find( "label" )
             .eq( 0 )
             .html( "Empresa&nbsp; &nbsp; &nbsp; &nbsp;" + empresa );
        $( "#etiq_marcas" )
             .find( "label" )
             .eq( 1 )
             .html( "Delegación&nbsp; &nbsp; &nbsp; &nbsp;" + delegacion );
    })

    $.post('/get_marcas', {ref_del:vardeleg})
      .done(function(data) {
          $('#lasmarcas').append('<tr><th>Fecha</th><th>Delegacion</th><th>Especialidad</th><th>Profesional</th><th style="width:5%; padding-left:1%">'+
          '<img src="/static/imagenes/perfil.jpg" class="center" width=70% height=70%/></th><th>Estado</th></tr>')
          for (let i=0; i < data.length; i++) {
               var celda="celda"+i
               var botcod="botcod"+i
               img=escoger_color(data[i][2])
               fecha = new Date(data[i][1])
               fechaform = fecha.toLocaleDateString()
               $("#lasmarcas").append('<tr><td>' + fechaform + '</td><td>' + data[i][3] + '</td><td>' + data[i][4] +
               '</td><td>' + data[i][5] + '</td><td id='+celda+'><input id='+botcod+' type=button style="height:16px; width:21px; font-size:80%; padding:1px"'+
                   'value="'+ data[i][6] + '" data-toggle="tooltip" title="Abrir ficha de profesional" onclick="abrefichaprof(' + data[i][6] +','+data[i][0] + ')"></td>'+
                   '<td style="width:8%; text-align:center"><input type="button" class="smallredondo"  style="background-image:' + img + ' "</tr>')
          }
      },"json")
}
//===================================================================================================================
function escoger_color(param) {
   switch(param) {
      case 'SI':
         laimagen = "url('/static/imagenes/verde.jpg')"
         break
      case 'NO':
         laimagen = "url('/static/imagenes/rojo.jpg')"
         break
      case 'WAIT':
         laimagen = "url('/static/imagenes/naranja.jpg')"
         break
   }
   return laimagen
}


//===================================================================================================================
function abrefichaprof(num_prof,num_marca) {
     $.post('/fichaprof', {el_prof:num_prof})
       .done(function(data) {
         getfichaprof(data,num_marca)
       },"json")
}
//===================================================================================================================
function getfichaprof(datos,num_marca)  {
      $.get("/static/fichaprof.html", function(htmlexterno){
         $("#espacio_fichaprof").html(htmlexterno);
            $("#codigo_prof").val(datos[0])
            $("#codigo_marca").val(num_marca)
            $("#espacio_fichaprof").css('display','block')
            $( "#fichaprof" )
                 .find( "label" )
                 .eq( 0 )
                 .html('Ficha de ' +datos[1] );
             $('#datos_prof').empty()
             $('#datos_prof').append('<tr><th style="width:25%">Nombre</th><td>' + datos[1] + '</td></tr>')
             $('#datos_prof').append('<tr><th>NIF</th><td>' + datos[5] + '</td></tr>')
             $('#datos_prof').append('<tr><th>Telefono</th><td>' + datos[3] + '</td></tr>')
             $('#datos_prof').append('<tr><th>Email</th><td>' + datos[2] + '</td></tr>')
             $('#datos_prof').append('<tr><th>Residencia</th><td>' + datos[4] + '</td></tr>')
             $("#curriculum").append(datos[6])
      });
}
//===================================================================================================================
function prepara_agenda(prof,marca,estado) {
    $.post('/entrevista', {elprof:prof, lamarca:marca, elestado:estado})
        .done(function(data) {
           if(estado=='SI') {
               abre_agenda(data)
           } else {
              $("#espacio_fichaprof").css('display','none')
           }
        })
}
//===================================================================================================================
function abre_agenda(datos) {
      $.get("/static/entrevista.html", function(htmlexterno){
         $("#espacio_citaprof").html(htmlexterno);
          $("#espacio_citaprof").css('display','block')
          $("#refmarca").val(datos[0])
          $("#refprof").val(datos[6])
          $("#refdeleg").val(datos[2])
          $("#modoestado").val(datos[3])
          $("#lamarca").empty()
          $('#lamarca').append('<tr><th>Profesional</th><td>' + datos[5] +'</td></tr>')
          $('#lamarca').append('<tr><th>Oferta</th><td>' + datos[4] +'</td></tr>')
      });
}
//===================================================================================================================
function validate_cita() {
   if($("#calend").val() == "" || $("#reloj").val() == "") {
         $("#menscita")
             .find( "label" )
             .eq( 0 )
             .html("Debe seleccionar fecha y hora" );
         $("#menscita").css('display','block')
   } else {
        fijacita( $('#refmarca').val(), $('#refprof').val(), $('#refdeleg').val() )
   }
}
//===================================================================================================================
function fijacita(lamarca,elprof,ladeleg) {
   lafecha = $("#calend").val()
   lahora = $("#reloj").val()
   $.post('/fijacita', {c_marca:lamarca, c_prof:elprof, c_deleg:ladeleg, fecha:lafecha, hora:lahora})
      .done(function(data) {
         $("#menscita")
             .find( "label" )
             .eq( 0 )
             .html( data );
         $("#menscita").css('display','block')
      },"json")
}
//===================================================================================================================
function vercitas(num_deleg)  {
   $.get("/static/agendaentrev.html", function(htmlexterno){
        $("#espacio_agendaentrevistas").html(htmlexterno);
         $("#espacio_agendaentrevistas").css('display','block')
   });

   $.post('/ver_agenda', {ref_deleg:num_deleg})
      .done(function(data) {
          if(data == "") {
              $("#mensagenda")
                 .find( "label" )
                 .eq( 0 )
                 .html("No hay entrevistas programadas" );
              $("#mensagenda").css('display','block')
          } else {
              $("#etiq_citas")
                 .find( "label" )
                 .eq( 0 )
                 .html( 'Empresa&nbsp; &nbsp; &nbsp; &nbsp;'+data[0][5] );

              $("#etiq_citas")
                 .find( "label" )
                 .eq( 1 )
                 .html('Delegación&nbsp; &nbsp; &nbsp;'+data[0][6]);

              $('#lascitas').append('<tr><th>Fecha</th><th>Hora</th><th>Profesional</th><th>Especialidad</th></tr>')
              for (let i=0; i < data.length; i++) {
                   fecha = new Date(data[i][1])
                   fechaform = fecha.toLocaleDateString()
                   $("#lascitas").append('<tr><td>' + fechaform + '</td><td>' + data[i][2] + '</td><td>' + data[i][3] + '</td><td>' + data[i][4] +'</td></tr>')
              }
          }
      },"json")
}
//===================================================================================================================
function about_us() {
   $("#recuadro").attr("style","width:50%")
   $.get("/static/AboutUs.html", function(htmlexterno){
        $("#recuadro").html(htmlexterno);
   });
}
//===================================================================================================================
function printdiv(elemento){
      var ventana = window.open('', 'PRINT', 'height=700,width=900');
      ventana.document.write('<img src="/static/imagenes/Gestimprof.jpg" height="10%"  width="100%">')
      ventana.document.write('<html><head><title>' + document.title + '</title>');
      ventana.document.write('<link href="static/css/newstyle.css" rel="stylesheet" type="text/css"/>')
      ventana.document.write('<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Amarante">')
      ventana.document.write('<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Asul">')
      ventana.document.write('</head><body >');
      ventana.document.write(elemento.innerHTML);
      ventana.document.write('</body></html>');
      ventana.document.write('<input type="button" value="Imprimir" onclick = "self.print()" />')
      ventana.document.write('<input type="button" value="Cerrar" onclick = "self.close()" />')
      ventana.document.close();
      ventana.focus();
//      ventana.print();
//      ventana.close();
      return true;
}
//=====================================================================================================