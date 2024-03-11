/**
 * Valida el formulario de envío de mensajes antes de proceder a
 * su envío. En caso de error, el mensaje de error se muestra
 * integrado en el documento.
 *
 * NOTA: Versión de la validación vía JS tras estudiar DHTML.
 */
function validateMessageDHTML() {
	var msj = document.forms["home"]["message"]
	var errores = ""
	var retorno = true

	if((msj.value.trim().length == 0) || (msj.value.trim().length > 128)) {
		errores += "El mensaje no puede estar vacío y debe ser como máximo de 128 caracteres"
		msj.className = "inputError"
		msj.focus()
		retorno = false
	}
	else {
	    msj.className = ""
	}

	if(! retorno) {
	    document.getElementById("errores_home").innerHTML = errores
	    document.getElementById("errores_home").style.display = "block"
	}
	else {
	    // Si el mensaje es válido también se manda el amigo del que se están viendo
	    // los mensajes. Si no se hiciera esto, cada vez que se mandara un mensaje
	    // nuevo se mostrarían los mensajes de todos los amigos
	    $('input#friend_copy').val($('select[name=friend]').val())
	}

	return(retorno)
}
//=========================================================================================================
function updateFriendMessagesJQUERY(param) {
    $.post("/friend_messages", {sujeto:param},
        function(data) {
            $('#messages').empty();
            data.forEach(function(item) {
                $('<li>').appendTo('#messages').text(item[0] + ": " + item[1])
             })
    }, "json");
}
//=============================================================================================================
 /**
  * Obtiene el listado de amigos mediante una petición AJAX.
  *
  * NOTA: El contenido del panel de amigos se construye generando un fragmento de código HTML (comparar con la
  * función updateFriendMessages).
  */
function showFriends() {
    $("#div_messages").hide()
    $.getJSON("/friends",
        function(data) {
            var i = 1;
            $('#friends').empty();
            $('#friends').append("<div class='par' id='t0'>" +
                    "<input id='check0' value='All' type='checkbox' onclick='pulsadoCheck(0)' />All</div>")
            data.forEach(function(item) {
                $('#friends').append("<div class='" + ((i%2) ? "impar" : "par") + "' id='t" + i + "'>" +
                    "<input id='check" + i + "' value='" + item + "' type='checkbox' onclick='pulsadoCheck(" + i + ")' />" +
                    item + "</div>")
                i++
            });
            $("#div_friends").show()
    });
}

// Funcionalidad adaptada del código de ejemplo para la selección única de amigos
var seleccionados = new Array();

function desmarcarSeleccionados() {
    while(seleccionados.length != 0) {
        var item = seleccionados.pop();
        item.click();
    }
}

function pulsadoCheck(id) {
    if(document.getElementById("check" + id).checked) {
        document.getElementById("t" + id).className += " seleccionado";
        document.getElementById("t" + id).style.fontWeight = "bold";
        document.getElementById("t" + id).style.fontStyle = "italic";

        desmarcarSeleccionados();

        seleccionados.push(document.getElementById("check" + id));
    }
    else {
        var clase = document.getElementById("t" + id).className;
        var i;

        document.getElementById("t" + id).className = clase.substr(0, clase.indexOf(" seleccionado"));
        document.getElementById("t" + id).style.fontWeight = "normal";
        document.getElementById("t" + id).style.fontStyle = "normal";

        i = seleccionados.findIndex(function(item) { return(item.id == "check" + id) });
        if(i > -1) {
            seleccionados.splice(i, 1);
        }
    }
}

function selectFriend() {
    if(seleccionados.length > 0) {
        $("#div_friends").hide()
        $("#div_messages").show()
        $('select[name="friend"]').val(seleccionados.pop().value)
        $('select[name="friend"]').change()
    }
    else {
        alert("Debe seleccionar un amigo")
    }
}