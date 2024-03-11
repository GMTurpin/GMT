
function validateLoginDHTML() {
	var form = document.forms["login"];
	var errores = "";
	var retorno = true;

	form["email"].className = ""
	form["passwd"].className = ""

	if(form["email"].value.trim() == "") {
		errores += "<li><b>Email</b> es obligatorio"
		form["email"].className = "inputError"
		form["email"].focus()
		retorno = false;
	}

	if(form["passwd"].value.trim() == "") {
		errores += "<li><b>Password</b> es obligatorio"
		form["passwd"].className = "inputError"
		if(retorno) form["passwd"].focus()
		retorno = false;
	}

	if(! retorno) {
	    document.getElementById("errores_login").innerHTML = errores
	    document.getElementById("errores_login").style.display = "block"
	}

	return(retorno);
}