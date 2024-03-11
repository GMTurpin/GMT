function grabar_exp(codigo) {
   texto=$("#curriculum").val()
   curri = texto.trimStart()
   $.post("/save_curriculum",{clave_prof:codigo, exp:curri})
     .done(function(data) {
         $("#curriculum").empty()
         $("#curriculum").append(data[0])
     },"json")
}
//=====================================================================================================
function web_ofertas() {
      $("#squarecenter").attr("style","width:79%")
      $("#area_izda").attr("style","width:40%;float:left")
      $.get("/static/ofertas.html", function(htmlexterno){
         $("#lasofertas").html(htmlexterno);
      });
      $("#lasofertas").show()
      lista_ofertas()
}
//=====================================================================================================
function lista_ofertas() {
    $.post('/get_ofertas')
      .done(function(data) {
             for (let i=0; i < data.length; i++) {
                   var celda="celda"+i
                   var botcod="botcod"+i
                   $('#tab_ofers').append('<tbody><tr><td id='+celda+' style="width:6%"><input id='+botcod+' type="button" style="height:16px; width:21px; font-size:80%;'+
                   'padding:1px" value="'+ data[i][0] + '" onclick="modif_color(this.id), ver_details(' + data[i][0] + ')"></td><td style="width:25%">' + data[i][4] +
                    '</td><td style="width:19%">' + data[i][5] +'</td><td>' + data[i][3] +'</td></tr></tbody>')
             }
      },"json")
}
//=====================================================================================================
function ver_details(param)  {
    $("#mensofers").css('display','none')
    $("#marcada").prop('checked',false)
    $("#ofer_selected").val(param)
    $.post("/ver_oferta", {cod_ofer:param})
      .done(function(data) {
         $("#ref_deleg").val(data[0])
         $("#ref_emp").val(data[1])
         $('#detail_ofer').empty()
         $('#detail_ofer').append(data[3])
         $('#detalles').show()
         $('#detail_ofer').show()
      },"json")
      .fail(function() {
         alert('Ha fallado. No hay detalles')
      })
}
//===================================================================================================================
function modif_color(param)  {
     $("#tab_ofers td").each(function(){
        $(this).css("backgroundColor","white")
     })
     indice = document.getElementById(param).parentNode.parentNode.rowIndex;
     for(let i=0; i<4; i++) {
         celda=(document.getElementById("tab_ofers").rows[indice].cells[i]);
         celda.style.backgroundColor="#FFE4C4"
     }
}
//=====================================================================================================
function marca_oferta()  {
   prof = $("#codigo_prof").val()
   ofer = $("#ofer_selected").val()
   deleg = $("#ref_deleg").val()
   emp = $("#ref_emp").val()
   $.post('/marcaroferta', {elprof:prof, laofer:ofer, ladeleg:deleg, laemp:emp})
     .done(function(data) {
         $("#mensofers")
             .find( "label" )
             .eq( 0 )
             .html( data );
         $("#mensofers").css('display','block')
     })
}
//=====================================================================================================
function cerrar_ofertas() {
    $("#lasofertas").hide()
    $("#squarecenter").attr("style","width:40%")
    $("#area_izda").attr("style","width:85%;float:left")
}
//=====================================================================================================
function ver_resp(param) {
      $.get("/static/respempresas.html", function(htmlexterno){
         $("#espacio_respempresas").html(htmlexterno);
      });
      $("#espacio_respempresas").css('display','block')
      lista_resp(param)
}
//=====================================================================================================
function lista_resp(codprof) {
    $.post('/get_respempresas', {elprof:codprof})
      .done(function(data) {
         for (let i=0; i < data.length; i++) {
               caja=escoger_boton(data[i][5])
               img=caja[0]
               accion=caja[1]
               $('#tab_respuestas').append('<tbody><tr><td style="width:26%">' + data[i][6] +'</td><td style="width:25%">' + data[i][7] + '</td><td style="width:43%">' + data[i][8]
               +'</td><td style="width:8%; text-align:center"><input type="button" class="smallredondo" id=' + data[i][0] + ' style="background-image:' + img + ' " '+
               ' onclick='+accion+'></td></tr></tbody>')
         }
      },"json")
}
//=====================================================================================================
function abre_entrevista(cod_marca) {
      $("#squarecenter").attr("style","width:79%")
      $("#area_izda").attr("style","width:40%;float:left")
      $.get("/static/hojacita.html", function(htmlexterno){
         $("#lasofertas").html(htmlexterno);
      });
      $("#lasofertas").show()
      busca_entrevista(cod_marca)
}
//=====================================================================================================
function busca_entrevista(cod_marca) {
     $.post('/get_entrevista', {lamarca:cod_marca})
       .done(function(data) {
            $("#cod_entrevista").val(data[0])
            $("#cod_deleg").val(data[2])
            laref=$("#cod_deleg").val()
            fecha = new Date(data[3])
            fechaform = fecha.toLocaleDateString()
            $( "#origen" )
                 .find( "label" )
                 .eq( 1 )
                 .html(data[6] );
            $( "#origen" )
                 .find( "label" )
                 .eq( 3 )
                 .html( data[5] );
            $( "#origen" )
                 .find( "label" )
                 .eq( 5 )
                 .html( data[8] );
            $( "#entrev" )
                 .find( "label" )
                 .eq( 1 )
                 .html( fechaform );
            $( "#entrev" )
                 .find( "label" )
                 .eq( 3 )
                 .html( data[4] );
            completa_busqueda(laref)
       },"json")
}
//=====================================================================================================
function completa_busqueda(refdeleg) {
    $.post("/ver_deleg", {cod_deleg:refdeleg})
      .done(function(data) {
         $('#tabla_ubicacion').empty()
         $('#tabla_ubicacion').append('<tr><th style="width:20%">Dirección</th><td>' + data[3] + '</td></tr>')
         $('#tabla_ubicacion').append('<tr><th>Email</th><td>' + data[4] + '</td></tr>')
         $('#tabla_ubicacion').append('<tr><th>Teléfono</th><td>' + data[5] + '</td></tr>')
         $('#tabla_ubicacion').append('<tr><th>Contacto</th><td>' + data[6] + '</td></tr>')
      },"json")
}
//=====================================================================================================
function ubic_deleg() {
        $("#zona_entrev")
             .find( "h3" )
             .eq( 0 )
             .html( 'Datos de la delegación' );
        $("#entrev").css('display','none')
        $("#zona_entrev").css('background-color','#D8BFD8')
        $("#espacio_ubicacion").css('display','block')
        $("#Ubicacion").prop("disabled", true)
        $("#Volver").prop("disabled", false)
}
//=====================================================================================================
function back_entrev() {
        $("#Ubicacion").prop("disabled", false)
        $("#Volver").prop("disabled", true)
        $("#espacio_ubicacion").css('display','none')
        $("#entrev").css('display','block')
        $("#zona_entrev")
             .find( "h3" )
             .eq( 0 )
             .html( 'Datos de la entrevista' );
        $("#zona_entrev").css('background-color','rgb(255, 255, 238, 0.8)')
}
//=====================================================================================================
function resp_entrev(cod_entr, resp)  {
    $.post('/resp_entrevista', {cod_ident:cod_entr, respuesta:resp})
      .done(function(data)  {
         $("#mensentrev")
             .find( "label" )
             .eq( 0 )
             .html( data );
         $("#mensentrev").css('display','block')
      },"json")
}
//=====================================================================================================
function escoger_boton(param) {
   switch(param) {
      case 'SI':
         laimagen = "url('/static/imagenes/verde.jpg')"
         codigo="abre_entrevista(this.id)"
         break
      case 'NO':
         laimagen = "url('/static/imagenes/rojo.jpg')"
         mensaje = "No hay mensaje adjunto"
         codigo = "devolver_respuesta(mensaje)"
         break
      case 'WAIT':
         laimagen = "url('/static/imagenes/naranja.jpg')"
         mensaje = "Hay que esperar respuesta de empresa"
         codigo = "devolver_respuesta(mensaje)"
         break
   }
   box=[laimagen,codigo]
   return box
}
//=====================================================================================================
function devolver_respuesta(mensaje) {
     $("#mensresp")
         .find( "label" )
         .eq( 0 )
         .html( mensaje );
     $("#mensresp").css('display','block')
}
//=====================================================================================================
function imprimirVarios(cajon){
      var ventana = window.open('', 'PRINT', 'height=700,width=900');
      ventana.document.write('<img src="/static/imagenes/Gestimprof.jpg" height="10%"  width="100%">')
      ventana.document.write('<html><head><title>' + document.title + '</title>');
      ventana.document.write('<link href="static/css/newstyle.css" rel="stylesheet" type="text/css"/>')
      ventana.document.write('<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Amarante">')
      ventana.document.write('<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Asul">')
      ventana.document.write('</head><body >');
      for (let i=0; i < cajon.length; i++) {
          ventana.document.write(cajon[i].innerHTML);
      }
      ventana.document.write('</body></html>');
      ventana.document.write('<input type="button" value="Imprimir" onclick = "self.print()" />')
      ventana.document.write('<input type="button" value="Cerrar" onclick = "self.close()" />')
      ventana.document.close();
      ventana.focus();
      return true;
}
//=====================================================================================================