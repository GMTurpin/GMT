function valid_signup() {
	var form = document.forms["signup"];
	var errores = "";
	var retorno = true;

	form["nombre"].className = ""
	form["email_prof"].className = ""
	form["nif_prof"].className = ""
	form["passwd"].className = ""
	form["confirm"].className = ""

	if(form["nombre"].value.trim() == "") {
		errores += "<li><b>Nombre</b> es obligatorio"
		form["nombre"].className = "inputError"
		form["nombre"].focus()
		retorno = false;
	}

	if(form["email_prof"].value.trim() == "") {
		errores += "<li><b>Email</b> es obligatorio"
		form["email_prof"].className = "inputError"
		form["email_prof"].focus()
		retorno = false;
	}

	if(form["nif_prof"].value.trim() == "") {
		errores += "<li><b>NIF</b> es obligatorio"
		form["nif_prof"].className = "inputError"
		form["nif_prof"].focus()
		retorno = false;
	}

	if(form["passwd"].value.trim() == "") {
		errores += "<li><b>Password</b> es obligatorio"
		form["passwd"].className = "inputError"
		if(retorno) form["passwd"].focus()
		retorno = false;
	}

    if(form["passwd"].value != form["confirm"].value) {
        errores += "<li>Las contraseñas no coinciden"
		form["confirm"].className = "inputError"
		if(retorno) form["confirm"].focus()
		retorno = false;
    }

	if(!retorno) {
	    document.getElementById("errores_signup").innerHTML = errores
	    document.getElementById("errores_signup").style.display = "block"
	}
    return(retorno);
}
//====================================================================================================================
