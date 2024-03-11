# -*- coding: iso-8859-15 -*-

from flask import Flask, request, render_template, session, redirect, url_for
import os.path
import mysql.connector
import datetime

hoy = datetime.date.today()
"""
try:
    conexion = mysql.connector.connect(
        host='localhost',
        port=3306,
        user='root',
        password='master#9763',
        database='gestor'
    )
    if conexion.is_connected():
        print('Conexion exitosa')
        mycursor = conexion.cursor()
except Exception as ex:
    print(ex)
#finally:
#    if conexion.is_connected():
#       mycursor.close()
#       conexion.close()
#       print('Conexion finalizada')
"""

app = Flask(__name__, template_folder='templates')

#SITE_ROOT = os.path.realpath(os.path.dirname(__file__))


@app.route('/', methods=['GET'])
@app.route('/index', methods=['GET'])
def index():
    """
    It process '/' and '/index' urls.
    :return: content of index.html file
    """
    if 'user_name' in session:
        logged = True
        nickname = session['user_name']
    else:
        logged = False
        nickname = ''
    return render_template('index.html', logged=logged, nickname=nickname)


# ==============================================================================================================================

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        return process_signup()

    # Si se usa el metodo GET
    return app.send_static_file('signup.html')


# ==============================================================================================================================
def process_signup():
    conexion = mysql.connector.connect(
        host='gestimprof.mysql.pythonanywhere-services.com',
        port=3306,
        user='gestimprof',
        password='master#9763',
        database='gestimprof$gestor'
    )
    mycursor = conexion.cursor()
    dato = request.form.get('nif_prof', None)
    el_nif = [dato]
    comprobacion = "SELECT COUNT(*) FROM profesionales WHERE nif_prof=%s"
    mycursor.execute(comprobacion, el_nif)
    fila = mycursor.fetchone()
    if fila[0] > 0:
        mycursor.close()
        conexion.close()
        return process_error("Ya existe un profesional registrado con ese NIF", url_for("index"))
    else:
        campos = ['nombre', 'email_prof', 'tel_prof', 'city_prof', 'nif_prof', 'passwd']
        add_prof = "INSERT INTO profesionales (nombre, email_prof,telefono, poblacion,nif_prof,password) VALUES (%s,%s, %s, %s, %s,%s)"
        clave_encrypt = "GMT9763"
        lista_prof = []
        for campo in campos:
            valor = request.form.get(campo, None)
            lista_prof.append(valor)
        data_prof = tuple(lista_prof)
        clave_prof = data_prof[5]
        mycursor.execute(add_prof, data_prof)
        conexion.commit()
        setclave = "UPDATE profesionales SET password=aes_encrypt(%s,%s) WHERE nif_prof=%s"
        caja_datos = (clave_prof, clave_encrypt, dato)
        mycursor.execute(setclave, caja_datos)
        conexion.commit()
        mycursor.close()
        conexion.close()
        return redirect(url_for("index"))


# ==============================================================================================================================
@app.route('/newEmpresa', methods=['GET', 'POST'])
def newempresa():
    if request.method == 'POST':
        return process_newempresa()
    # Si se usa el metodo GET
    return app.send_static_file('newEmpresa.html')


def process_newempresa():
    conexion = mysql.connector.connect(
        host='gestimprof.mysql.pythonanywhere-services.com',
        port=3306,
        user='gestimprof',
        password='master#9763',
        database='gestimprof$gestor'
    )
    mycursor = conexion.cursor()
    faltan = []
    dato = request.form.get('nif', None)
    cod_nif = [dato]
    comprobacion = "SELECT COUNT(*) FROM empresas WHERE nif=%s"
    mycursor.execute(comprobacion, cod_nif)
    fila = mycursor.fetchone()
    if fila[0] > 0:
        conexion.commit()
        mycursor.close()
        conexion.close()
        return process_error("Ya hay una empresa registrada con ese NIF", url_for("index"))
    else:
        getindice = "SELECT MAX(Ref) FROM empresas"
        mycursor.execute(getindice)
        ult_ref = mycursor.fetchone()
        numref = ult_ref[0] + 1
        lista_empresa = [numref]
        campos = ['empresa', 'nif', 'director', 'telefono', 'email_emp']
        add_empresa = "INSERT INTO empresas (Ref, Empresa, NIF, Director, Telefono,Email) VALUES (%s,%s, %s, %s, %s,%s)"
        for campo in campos:
            valor = request.form.get(campo, None)
            lista_empresa.append(valor)
            if valor is None or valor == '':
                faltan.append(campo)
        data_empresa = tuple(lista_empresa)
        mycursor.execute(add_empresa, data_empresa)
        conexion.commit()
        extraccion = "SELECT * FROM empresas WHERE nif=%s"
        mycursor.execute(extraccion, cod_nif)
        fila = mycursor.fetchone()
        ref_empresa = fila[0]
        name_empresa = fila[1]
        clave_acceso = (fila[1][0:5] + str(ref_empresa))
        clave_encrypt = "GMT9763"
        datos = [clave_acceso, clave_encrypt, ref_empresa]
        fijar_clave = "UPDATE empresas SET password=aes_encrypt(%s,%s) WHERE Ref=%s"
        texto_etiqueta = "Anote su clave de acceso"
        mycursor.execute(fijar_clave, datos)
        conexion.commit()
        mycursor.close()
        conexion.close()
        return render_template('newclave.html', clave=clave_acceso, empresa=name_empresa, etiqueta=texto_etiqueta, next=url_for("index"))


# =====================================================================================================================================================

@app.route('/update_emp', methods=['POST'])
def update_emp():
    conexion = mysql.connector.connect(
        host='gestimprof.mysql.pythonanywhere-services.com',
        port=3306,
        user='gestimprof',
        password='master#9763',
        database='gestimprof$gestor'
    )
    mycursor = conexion.cursor()
    ref_empresa = request.form.get('ref_comp', None)
    name_empresa = request.form.get('company', None)
    num_nif = request.form.get('elnif', None)
    name_director = request.form.get('el_dir', None)
    num_tel = request.form.get('el_tel', None)
    dir_email = request.form.get('el_email', None)
    campos = ['empresa', 'nif', 'director', 'telefono', 'email']
    claves = [name_empresa, num_nif, name_director, num_tel, dir_email]
    valores = tuple(claves)
    indice = 0
    for i in campos:
        datos = []
        datos.append(valores[indice])
        datos.append(ref_empresa)
        edicion = "UPDATE empresas SET " + (i) + "= %s WHERE ref=%s"
        mycursor.execute(edicion, datos)
        conexion.commit()
        indice += 1
    mycursor.close()
    conexion.close()
    return redirect(url_for('index'))


# =====================================================================================================================================================
@app.route('/get_empresas', methods=['POST'])
def get_empresas():
    conex2 = mysql.connector.connect(
        host='gestimprof.mysql.pythonanywhere-services.com',
        port=3306,
        user='gestimprof',
        password='master#9763',
        database='gestimprof$gestor'
    )
    listempresas = []
    if conex2.is_connected():
        mycursor = conex2.cursor()
        origen_pet = request.form.get('solicitante', None)
        clave_pass = request.form.get('cod_clave', None)
        if origen_pet == 'GESTOR':
            consulta = "SELECT Ref,empresa,NIF,Director,Telefono,email,Actividad from empresas"
            mycursor.execute(consulta)
            rows = mycursor.fetchall()
            for fila in rows:
                listempresas.append(fila)
        elif origen_pet == 'EMPRESARIO':
            clave_encrypt = "GMT9763"
            clave_acceso = clave_pass
            datos = [clave_encrypt, clave_acceso]
            operacion = "SELECT ref, empresa,NIF, Director, Telefono, email, actividad FROM empresas where cast(aes_decrypt(password, %s) as char)=%s;"
            mycursor.execute(operacion, datos)
            fila = mycursor.fetchone()
            listempresas.append(fila)
            mycursor.close()
            conex2.close()
    else:
        print('No estoy conectado')
    return listempresas


# =================================================================================================================
@app.route('/checkclave', methods=['POST'])
def checkclave():
    conex3 = mysql.connector.connect(
        host='gestimprof.mysql.pythonanywhere-services.com',
        port=3306,
        user='gestimprof',
        password='master#9763',
        database='gestimprof$gestor'
    )
    mycursor = conex3.cursor()
    miclave = request.form.get('clave', None)
    clave_encrypt = "GMT9763"
    datos = [clave_encrypt, miclave]
    operacion1 = "SELECT COUNT(*) FROM empresas where cast(aes_decrypt(password, %s) as char)=%s;"
    mycursor.execute(operacion1, datos)
    fila = mycursor.fetchone()
    if fila[0] == 0:
        lista = ['ERROR', 'Clave no registrada', ' ']
    else:
        lista = ['Empresa']
        session['clave_decrypt'] = miclave
        operacion2 = "SELECT Ref, empresa FROM empresas where cast(aes_decrypt(password, %s) as char)=%s;"
        mycursor.execute(operacion2, datos)
        fila = mycursor.fetchone()
        for campo in fila:
            lista.append(campo)
    mycursor.close()
    conex3.close()
    return lista


# =================================================================================================================
@app.route('/nueva_clave', methods=['POST'])
def nueva_clave():
    conexion = mysql.connector.connect(
        host='gestimprof.mysql.pythonanywhere-services.com',
        port=3306,
        user='gestimprof',
        password='master#9763',
        database='gestimprof$gestor'
    )
    mycursor = conexion.cursor()
    ref_empresa = request.form.get('cod_company', None)
    clave_empresa = request.form.get('clave_nueva', None)
    clave_encrypt = "GMT9763"
    datos = [clave_empresa, clave_encrypt, ref_empresa]
    fijar_clave = "UPDATE empresas SET password=aes_encrypt(%s,%s) WHERE Ref=%s"
    mycursor.execute(fijar_clave, datos)
    conexion.commit()
    mycursor.close()
    conexion.close()
    return redirect(url_for("index"))


# =================================================================================================================
@app.route('/ver_clave', methods=['POST'])
def verclave():
    conexion = mysql.connector.connect(
        host='gestimprof.mysql.pythonanywhere-services.com',
        port=3306,
        user='gestimprof',
        password='master#9763',
        database='gestimprof$gestor'
    )
    mycursor = conexion.cursor()
    ref_empresa = request.form.get('c_emp', None)
    clave_encrypt = "GMT9763"
    extraccion = "SELECT cast(aes_decrypt(password, %s) as char) FROM empresas WHERE Ref=%s;"
    datos = [clave_encrypt, ref_empresa]
    mycursor.execute(extraccion, datos)
    paquete = []
    fila = mycursor.fetchone()
    if fila[0] is not None:
        paquete.append(fila[0])
        paquete.append("Clave de la empresa seleccionada")
    else:
        paquete.append("xxx")
        paquete.append("No hay clave para esta empresa")
    mycursor.close()
    conexion.close()
    return paquete


# =================================================================================================
@app.route('/del_Empresa', methods=['POST'])
def del_empresa():
    conexion = mysql.connector.connect(
        host='gestimprof.mysql.pythonanywhere-services.com',
        port=3306,
        user='gestimprof',
        password='master#9763',
        database='gestimprof$gestor'
    )
    mycursor = conexion.cursor()
    codigo = request.form.get('company', None)
    codempre = [codigo]
    operacion1 = "DELETE FROM empresas WHERE Ref =%s;"
    mycursor.execute(operacion1, codempre)
    operacion2 = "DELETE FROM deptos WHERE Ref =%s;"
    mycursor.execute(operacion2, codempre)
    operacion3 = "DELETE FROM delegs WHERE Ref =%s;"
    mycursor.execute(operacion3, codempre)
    operacion4 = "DELETE FROM applys WHERE ref_emp =%s;"
    mycursor.execute(operacion4, codempre)
    conexion.commit()
    mycursor.close()
    conexion.close()
    return redirect(url_for("empresas"))


# =================================================================================================================
@app.route('/save_active_emp', methods=['POST'])
def save_active_emp():
    conexion = mysql.connector.connect(
        host='gestimprof.mysql.pythonanywhere-services.com',
        port=3306,
        user='gestimprof',
        password='master#9763',
        database='gestimprof$gestor'
    )
    mycursor = conexion.cursor()
    operacion = "UPDATE empresas SET Actividad = %s WHERE Ref =%s;"
    codempre = request.form.get('company', None)
    jobs = request.form.get('business', None)
    mycursor.execute(operacion, (jobs, codempre))
    conexion.commit()
    mycursor.close()
    conexion.close()
    return redirect(url_for("empresas"))


# =================================================================================================================
@app.route('/load_activ_emp', methods=['POST'])
def load_activ_emp():
    conexion = mysql.connector.connect(
        host='gestimprof.mysql.pythonanywhere-services.com',
        port=3306,
        user='gestimprof',
        password='master#9763',
        database='gestimprof$gestor'
    )
    mycursor = conexion.cursor()
    comp = request.form.get('company', None)
    codempre = [comp]
    consulta = "SELECT Ref,Empresa,NIF,Director,Telefono,email,Actividad FROM empresas WHERE Ref=%s;"
    mycursor.execute(consulta, codempre)
    fila = mycursor.fetchone()
    listelems = []
    for elem in fila:
        listelems.append(elem)
    if conexion.is_connected():
        mycursor.close()
        conexion.close()
        print('Conexion finalizada')
    return listelems


# =================================================================================================================
@app.route('/modify_depto', methods=['POST'])
def modify_depto():
    conexion = mysql.connector.connect(
        host='gestimprof.mysql.pythonanywhere-services.com',
        port=3306,
        user='gestimprof',
        password='master#9763',
        database='gestimprof$gestor'
    )
    mycursor = conexion.cursor()
    clave = request.form.get('depto', None)
    cod_depto = [clave]
    operacion = "SELECT * FROM deptos WHERE cod =%s;"
    mycursor.execute(operacion, cod_depto)
    fila = mycursor.fetchone()
    list_campos = []
    for campo in fila:
        list_campos.append(campo)
    if conexion.is_connected():
        mycursor.close()
        conexion.close()
        print('Conexion finalizada')
    return list_campos


# =================================================================================================================
@app.route('/update_depto', methods=['POST'])
def update_depto():
    conexion = mysql.connector.connect(
        host='gestimprof.mysql.pythonanywhere-services.com',
        port=3306,
        user='gestimprof',
        password='master#9763',
        database='gestimprof$gestor'
    )
    mycursor = conexion.cursor()
    c_depto = request.form.get('codigo', None)
    department = request.form.get('departamento', None)
    respons = request.form.get('responsable', None)
    telef = request.form.get('telefono', None)
    listacampos = [department, respons, telef, c_depto]
    operacion = "UPDATE deptos SET depto=%s, Responsable=%s, Telefono=%s WHERE cod=%s;"
    mycursor.execute(operacion, listacampos)
    conexion.commit()
    mycursor.close()
    conexion.close()
    return redirect(url_for("empresas"))


# =================================================================================================================
@app.route('/save_depto', methods=['POST'])  # Version MySQL
def save_depto():
    conexion = mysql.connector.connect(
        host='gestimprof.mysql.pythonanywhere-services.com',
        port=3306,
        user='gestimprof',
        password='master#9763',
        database='gestimprof$gestor'
    )
    mycursor = conexion.cursor()
    codempre = request.form.get('company', None)
    department = request.form.get('departamento', None)
    respons = request.form.get('responsable', None)
    telef = request.form.get('telefono', None)
    listacampos = [codempre, department, respons, telef]
    operacion = "INSERT INTO deptos (Ref, depto, Responsable, Telefono) VALUES (%s, %s, %s, %s)"
    mycursor.execute(operacion, listacampos)
    conexion.commit()
    mycursor.close()
    conexion.close()
    return redirect(url_for("empresas"))


# =================================================================================================================
@app.route('/load_deptos', methods=['POST'])
def load_deptos():
    conexion = mysql.connector.connect(
        host='gestimprof.mysql.pythonanywhere-services.com',
        port=3306,
        user='gestimprof',
        password='master#9763',
        database='gestimprof$gestor'
    )
    mycursor = conexion.cursor()
    comp = request.form.get('company', None)
    codempre = [comp]
    consulta = "SELECT * FROM deptos WHERE Ref=%s;"
    mycursor.execute(consulta, codempre)
    rows = mycursor.fetchall()
    listdeptos = []
    for fila in rows:
        listdeptos.append(fila)
    if conexion.is_connected():
        mycursor.close()
        conexion.close()
        print('Conexion finalizada')
    return listdeptos


# =================================================================================================================
@app.route('/elim_depto', methods=['POST'])
def elim_depto():
    conexion = mysql.connector.connect(
        host='gestimprof.mysql.pythonanywhere-services.com',
        port=3306,
        user='gestimprof',
        password='master#9763',
        database='gestimprof$gestor'
    )
    mycursor = conexion.cursor()
    clave = request.form.get('codigo', None)
    cod_depto = [clave]
    operacion = "DELETE FROM deptos WHERE cod=%s"
    mycursor.execute(operacion, cod_depto)
    conexion.commit()
    if conexion.is_connected():
        mycursor.close()
        conexion.close()
        print('Conexion finalizada')
    return redirect(url_for("empresas"))


# =================================================================================================================
@app.route('/save_deleg', methods=['POST'])
def save_deleg():
    conexion = mysql.connector.connect(
        host='gestimprof.mysql.pythonanywhere-services.com',
        port=3306,
        user='gestimprof',
        password='master#9763',
        database='gestimprof$gestor'
    )
    mycursor = conexion.cursor()
    cod_empresa = request.form.get('company', None)
    nombre_zona = request.form.get('city', None)
    data_addres = request.form.get('address', None)
    email = request.form.get('eml', None)
    num_tfno = request.form.get('phone', None)
    contacto = request.form.get('persona', None)
    listadatos = [cod_empresa, nombre_zona, data_addres, email, num_tfno, contacto]
    operacion = "INSERT INTO delegs (ref, poblacion, direccion, email, telefono, contacto) VALUES (%s, %s, %s, %s, %s, %s)"
    mycursor.execute(operacion, listadatos)
    conexion.commit()
    mycursor.close()
    conexion.close()
    return redirect(url_for("empresas"))


# =================================================================================================================
@app.route('/load_delegs', methods=['POST'])
def load_delegs():
    conexion = mysql.connector.connect(
        host='gestimprof.mysql.pythonanywhere-services.com',
        port=3306,
        user='gestimprof',
        password='master#9763',
        database='gestimprof$gestor'
    )
    mycursor = conexion.cursor()
    codigo_empresa = request.form.get('company', None)
    consulta = "SELECT * FROM delegs WHERE ref=%s;"
    datos = [codigo_empresa]
    mycursor.execute(consulta, datos)
    rows = mycursor.fetchall()
    listdelegs = []
    for fila in rows:
        listdelegs.append(fila)
    if conexion.is_connected():
        mycursor.close()
        conexion.close()
        print('Conexion finalizada')
    return listdelegs


# =================================================================================================================
@app.route('/ver_deleg', methods=['POST'])
def ver_deleg():
    conexion = mysql.connector.connect(
        host='gestimprof.mysql.pythonanywhere-services.com',
        port=3306,
        user='gestimprof',
        password='master#9763',
        database='gestimprof$gestor'
    )
    mycursor = conexion.cursor()
    codigo_deleg = request.form.get('cod_deleg', None)
    consulta = "SELECT * FROM delegs WHERE cod=%s;"
    datos = [codigo_deleg]
    mycursor.execute(consulta, datos)
    fila = mycursor.fetchone()
    list_campos = []
    for campo in fila:
        list_campos.append(campo)
    if conexion.is_connected():
        mycursor.close()
        conexion.close()
        print('Conexion finalizada')
    return list_campos


# =================================================================================================================
@app.route('/borrar_deleg', methods=['POST'])
def borrar_deleg():
    conexion = mysql.connector.connect(
        host='gestimprof.mysql.pythonanywhere-services.com',
        port=3306,
        user='gestimprof',
        password='master#9763',
        database='gestimprof$gestor'
    )
    mycursor = conexion.cursor()
    codigo = request.form.get('cod_branch', None)
    codigo_del = [codigo]
    operacion1 = "DELETE FROM Applys WHERE cod_deleg=%s;"
    mycursor.execute(operacion1, codigo_del)
    conexion.commit()
    operacion2 = "DELETE FROM delegs WHERE cod=%s;"
    mycursor.execute(operacion2, codigo_del)
    conexion.commit()
    mycursor.close()
    conexion.close()
    return redirect(url_for("index"))


# =================================================================================================================
@app.route('/save_apply', methods=['POST'])
def save_apply():
    conexion = mysql.connector.connect(
        host='gestimprof.mysql.pythonanywhere-services.com',
        port=3306,
        user='gestimprof',
        password='master#9763',
        database='gestimprof$gestor'
    )
    mycursor = conexion.cursor()
    cod_deleg = request.form.get('branch', None)
    ref_empresa = request.form.get('company', None)
    profession = request.form.get('specialty', None)
    requirements = request.form.get('requist', None)
    list_campos = [cod_deleg, ref_empresa, profession, requirements]
    operacion = "INSERT INTO applys (cod_deleg, ref_emp, especialidad, requist) VALUES (%s, %s, %s, %s)"
    mycursor.execute(operacion, list_campos)
    conexion.commit()
    mycursor.close()
    conexion.close()
    return redirect(url_for('empresas'))


# =================================================================================================================
@app.route('/peticiones', methods=['POST'])
def peticiones():
    conexion = mysql.connector.connect(
        host='gestimprof.mysql.pythonanywhere-services.com',
        port=3306,
        user='gestimprof',
        password='master#9763',
        database='gestimprof$gestor'
    )
    mycursor = conexion.cursor()
    cod_empresa = request.form.get('company', None)
    codigo = [cod_empresa]
    operacion = "SELECT applys.idapply, applys.ref_emp, applys.cod_deleg,applys.especialidad,applys.requist,delegs.cod,delegs.poblacion FROM delegs INNER JOIN applys ON " \
                "applys.cod_deleg=delegs.cod WHERE applys.ref_emp=%s"
    mycursor.execute(operacion, codigo)
    rows = mycursor.fetchall()
    list_petits = []
    for fila in rows:
        list_petits.append(fila)
    if conexion.is_connected():
        mycursor.close()
        conexion.close()
        print('Conexion finalizada')
    return list_petits


# =================================================================================================================
@app.route('/ver_detalles', methods=['POST'])
def ver_detalles():
    conexion = mysql.connector.connect(
        host='gestimprof.mysql.pythonanywhere-services.com',
        port=3306,
        user='gestimprof',
        password='master#9763',
        database='gestimprof$gestor'
    )
    mycursor = conexion.cursor()
    codigo_apply = request.form.get('cod_apply', None)
    codigo = [codigo_apply]
    operacion = "SELECT * FROM applys WHERE idapply=%s"
    list_campos = []
    mycursor.execute(operacion, codigo)
    fila = mycursor.fetchone()
    for campo in fila:
        list_campos.append(campo)
    if conexion.is_connected():
        mycursor.close()
        conexion.close()
        print('Conexion finalizada')
    return list_campos


# =================================================================================================================
@app.route('/checkprof', methods=['POST'])
def checkprof():
    conexion = mysql.connector.connect(
        host='gestimprof.mysql.pythonanywhere-services.com',
        port=3306,
        user='gestimprof',
        password='master#9763',
        database='gestimprof$gestor'
    )
    mycursor = conexion.cursor()
    laclave = request.form.get('clave', None)
    clave_encrypt = "GMT9763"
    datos = [clave_encrypt, laclave]
    operacion1 = "SELECT COUNT(*) FROM profesionales where cast(aes_decrypt(password, %s) as char)=%s;"
    mycursor.execute(operacion1, datos)
    fila = mycursor.fetchone()
    list_campos = []
    if fila[0] == 0:
        list_campos.append('ERROR')
        list_campos.append('Clave no registrada')
    else:
        operacion2 = "SELECT cod_prof,nombre, email_prof,telefono,poblacion,nif_prof,experiencia FROM profesionales where cast(aes_decrypt(password, %s) as char)=%s;"
        mycursor.execute(operacion2, datos)
        fila = mycursor.fetchone()
        for campo in fila:
            list_campos.append(campo)
    mycursor.close()
    conexion.close()
    return list_campos


# =================================================================================================================
@app.route('/save_curriculum', methods=['POST'])
def save_curriculum():
    conexion = mysql.connector.connect(
        host='gestimprof.mysql.pythonanywhere-services.com',
        port=3306,
        user='gestimprof',
        password='master#9763',
        database='gestimprof$gestor'
    )
    mycursor = conexion.cursor()
    list_datos = []
    laclave = request.form.get('clave_prof', None)
    elcurri = request.form.get('exp', None)
    list_datos.append(elcurri)
    list_datos.append(laclave)
    operacion = "UPDATE profesionales SET experiencia=%s WHERE cod_prof=%s"
    mycursor.execute(operacion, list_datos)
    conexion.commit()
    mycursor.close()
    conexion.close()
    return list_datos


# ================================================================================================================
@app.route('/fichaprof', methods=['POST'])
def fichaprof():
    conexion = mysql.connector.connect(
        host='gestimprof.mysql.pythonanywhere-services.com',
        port=3306,
        user='gestimprof',
        password='master#9763',
        database='gestimprof$gestor'
    )
    mycursor = conexion.cursor()
    clave = request.form.get('el_prof', None)
    ind_prof = [clave]
    extraccion = "SELECT cod_prof, nombre, email_prof, telefono, poblacion, nif_prof, experiencia FROM profesionales WHERE cod_prof=%s"
    mycursor.execute(extraccion, ind_prof)
    list_campos = []
    row = mycursor.fetchone()
    for campo in row:
        list_campos.append(campo)
    mycursor.close()
    conexion.close()
    return list_campos


# ================================================================================================================
@app.route('/get_ofertas', methods=['POST'])
def get_ofertas():
    conexion = mysql.connector.connect(
        host='gestimprof.mysql.pythonanywhere-services.com',
        port=3306,
        user='gestimprof',
        password='master#9763',
        database='gestimprof$gestor'
    )
    mycursor = conexion.cursor()
    consulta = "SELECT applys.idapply, cod_deleg, ref_emp, especialidad, empresas.empresa, delegs.poblacion FROM applys LEFT JOIN delegs ON delegs.cod=applys.cod_deleg " \
               "INNER JOIN empresas ON empresas.ref=delegs.ref ORDER BY empresas.ref ASC"
    mycursor.execute(consulta)
    lista_filas = []
    filas = mycursor.fetchall()
    for fila in filas:
        lista_filas.append(fila)
    mycursor.close()
    conexion.close()
    return lista_filas


# ================================================================================================================
@app.route('/get_respempresas', methods=['POST'])
def resp_empresas():
    conexion = mysql.connector.connect(
        host='gestimprof.mysql.pythonanywhere-services.com',
        port=3306,
        user='gestimprof',
        password='master#9763',
        database='gestimprof$gestor'
    )
    mycursor = conexion.cursor()
    c_prof = request.form.get('elprof', None)
    profesional = [c_prof]
    list_resp = []
    consulta = "SELECT marcas.idmarca, marcas.fecha, marcas.codemp, marcas.cod_deleg, marcas.codapply, marcas.estado, empresas.empresa, delegs.poblacion, applys.especialidad" \
               " FROM marcas LEFT JOIN applys ON applys.idapply=marcas.codapply LEFT JOIN delegs ON delegs.cod=marcas.cod_deleg INNER JOIN empresas ON empresas.ref=marcas.codemp" \
               " WHERE marcas.codprof=%s"
    mycursor.execute(consulta, profesional)
    filas = mycursor.fetchall()
    for fila in filas:
        list_resp.append(fila)
    mycursor.close()
    conexion.close()
    return list_resp


# ================================================================================================================
@app.route('/ver_oferta', methods=['POST'])
def ver_oferta():
    conexion = mysql.connector.connect(
        host='gestimprof.mysql.pythonanywhere-services.com',
        port=3306,
        user='gestimprof',
        password='master#9763',
        database='gestimprof$gestor'
    )
    mycursor = conexion.cursor()
    id_ofer = request.form.get('cod_ofer', None)
    extraccion = "SELECT cod_deleg, ref_emp, especialidad, requist FROM applys WHERE idapply=%s"
    dato = [id_ofer]
    list_campos = []
    mycursor.execute(extraccion, dato)
    campos = mycursor.fetchone()
    for campo in campos:
        list_campos.append(campo)
    mycursor.close()
    conexion.close()
    return list_campos


# ================================================================================================================
@app.route('/marcaroferta', methods=['POST'])
def marcaroferta():
    conexion = mysql.connector.connect(
        host='gestimprof.mysql.pythonanywhere-services.com',
        port=3306,
        user='gestimprof',
        password='master#9763',
        database='gestimprof$gestor'
    )
    mycursor = conexion.cursor()
    prof = request.form.get('elprof', None)
    oferta = request.form.get('laofer', None)
    deleg = request.form.get('ladeleg', None)
    emp = request.form.get('laemp', None)
    comprobacion = "SELECT COUNT(*) FROM marcas WHERE codprof=%s AND codapply=%s"
    variables = [prof, oferta]
    aviso = []
    mycursor.execute(comprobacion, variables)
    fila = mycursor.fetchone()
    if fila[0] > 0:
        aviso.append('Esta oferta ya está marcada')
    else:
        insercion = "INSERT INTO marcas (fecha, codprof, codapply, cod_deleg, codemp, estado) VALUES (%s, %s, %s, %s, %s, %s)"
        valores = [hoy, prof, oferta, deleg, emp, 'WAIT']
        mycursor.execute(insercion, valores)
        conexion.commit()
        aviso.append('Se ha marcado la oferta')
    mycursor.close()
    conexion.close()
    return aviso


# ================================================================================================================
@app.route('/get_marcas', methods=['POST'])
def get_marcas():
    conexion = mysql.connector.connect(
        host='gestimprof.mysql.pythonanywhere-services.com',
        port=3306,
        user='gestimprof',
        password='master#9763',
        database='gestimprof$gestor'
    )
    mycursor = conexion.cursor()
    deleg = request.form.get('ref_del', None)
    extraccion = "SELECT idmarca,fecha,marcas.estado, delegs.poblacion,applys.especialidad, profesionales.nombre, profesionales.cod_prof FROM marcas LEFT JOIN delegs ON " \
                 "delegs.cod=marcas.cod_deleg LEFT JOIN applys  ON applys.idapply=marcas.codapply INNER JOIN profesionales ON profesionales.cod_prof=marcas.codprof WHERE " \
                 "marcas.cod_deleg=%s"
    variable = [deleg]
    mycursor.execute(extraccion, variable)
    list_marcas = []
    filas = mycursor.fetchall()
    for fila in filas:
        list_marcas.append(fila)
    mycursor.close()
    conexion.close()
    return list_marcas


# ================================================================================================================
@app.route('/entrevista', methods=['POST'])
def entrevista():
    conexion = mysql.connector.connect(
        host='gestimprof.mysql.pythonanywhere-services.com',
        port=3306,
        user='gestimprof',
        password='master#9763',
        database='gestimprof$gestor'
    )
    mycursor = conexion.cursor()
    ref_marca = request.form.get('lamarca', None)
    var_estado = request.form.get('elestado', None)
    list_campos = []
    if var_estado == 'SI':
        extraccion = "SELECT idmarca,fecha,marcas.cod_deleg, delegs.poblacion,applys.especialidad, profesionales.nombre, profesionales.cod_prof FROM marcas left join delegs on " \
                     "delegs.cod=marcas.cod_deleg LEFT JOIN applys  ON applys.idapply=marcas.codapply INNER JOIN profesionales ON profesionales.cod_prof=marcas.codprof WHERE " \
                     "idmarca=%s"
        var_marca = [ref_marca]
        mycursor.execute(extraccion, var_marca)
        fila = mycursor.fetchone()
        for campo in fila:
            list_campos.append(campo)
    else:
        variables = [var_estado, ref_marca]
        marcacion = "UPDATE marcas SET estado=%s WHERE idmarca=%s"
        mycursor.execute(marcacion, variables)
        conexion.commit()
    mycursor.close()
    conexion.close()
    return list_campos


# ================================================================================================================
@app.route('/fijacita', methods=['POST'])
def fijacita():
    conexion = mysql.connector.connect(
        host='gestimprof.mysql.pythonanywhere-services.com',
        port=3306,
        user='gestimprof',
        password='master#9763',
        database='gestimprof$gestor'
    )
    mycursor = conexion.cursor()
    ref_marca = request.form.get('c_marca', None)
    ref_prof = request.form.get('c_prof', None)
    ref_deleg = request.form.get('c_deleg', None)
    var_fecha = request.form.get('fecha', None)
    var_hora = request.form.get('hora', None)
    comprob1 = "SELECT COUNT(*) FROM entrevistas WHERE cod_deleg=%s AND fecha=%s AND hora=%s"
    variab1 = [ref_deleg, var_fecha, var_hora]
    mycursor.execute(comprob1, variab1)
    fila1 = mycursor.fetchone()

    comprob2 = "SELECT COUNT(*) FROM entrevistas WHERE idmarca=%s"
    variab2 = [ref_marca]
    mycursor.execute(comprob2, variab2)
    fila2 = mycursor.fetchone()
    if fila1[0] > 0:
        mensaje = ["ESTE HUECO YA ESTA OCUPADO"]
    elif fila2[0] > 0:
        mensaje = ["Ya hay entrevista para esta oferta"]
    else:
        insercion = "INSERT INTO entrevistas (idmarca, codprof, cod_deleg, fecha, hora, estado) VALUES (%s, %s, %s, %s, %s, %s)"
        valores = [ref_marca, ref_prof, ref_deleg, var_fecha, var_hora, 'WAIT']
        mycursor.execute(insercion, valores)
        conexion.commit()
        mensaje = ['ENTREVISTA PROGRAMADA']
        variables = ['SI', ref_marca]
        marcacion = "UPDATE marcas SET estado=%s WHERE idmarca=%s"
        mycursor.execute(marcacion, variables)
        conexion.commit()
    mycursor.close()
    conexion.close()
    return mensaje


# ================================================================================================================
@app.route('/get_entrevista', methods=['POST'])
def get_entrevista():
    conexion = mysql.connector.connect(
        host='gestimprof.mysql.pythonanywhere-services.com',
        port=3306,
        user='gestimprof',
        password='master#9763',
        database='gestimprof$gestor'
    )
    mycursor = conexion.cursor()
    ref_marca = request.form.get('lamarca', None)
    extraccion = "SELECT entrevistas.ident, entrevistas.idmarca,entrevistas.cod_deleg, entrevistas.fecha,entrevistas.hora, delegs.poblacion, empresas.Empresa, marcas.codapply, " \
                 "applys.especialidad FROM entrevistas INNER JOIN marcas ON marcas.idmarca=entrevistas.idmarca INNER JOIN applys ON applys.idapply=marcas.codapply INNER JOIN " \
                 "delegs ON delegs.cod=entrevistas.cod_deleg LEFT JOIN empresas ON delegs.ref=empresas.Ref WHERE entrevistas.idmarca=%s"
    variable = [ref_marca]
    mycursor.execute(extraccion, variable)
    campos = []
    fila = mycursor.fetchone()
    for campo in fila:
        campos.append(campo)
    mycursor.close()
    conexion.close()
    return campos


# ================================================================================================================
@app.route('/resp_entrevista', methods=['POST'])
def resp_entrevista():
    conexion = mysql.connector.connect(
        host='gestimprof.mysql.pythonanywhere-services.com',
        port=3306,
        user='gestimprof',
        password='master#9763',
        database='gestimprof$gestor'
    )
    mycursor = conexion.cursor()
    ref_entrev = request.form.get('cod_ident', None)
    laresp = request.form.get('respuesta', None)
    operacion = "UPDATE entrevistas SET estado=%s WHERE ident=%s"
    variables = [laresp, ref_entrev]
    mycursor.execute(operacion, variables)
    conexion.commit()
    mensaje = ['ENTREVISTA ACEPTADA'] if laresp == 'ACEPTO' else ['ENTREVISTA RECHAZADA']
    mycursor.close()
    conexion.close()
    return mensaje


# ================================================================================================================
@app.route('/ver_agenda', methods=['POST'])
def ver_agenda():
    conexion = mysql.connector.connect(
        host='gestimprof.mysql.pythonanywhere-services.com',
        port=3306,
        user='gestimprof',
        password='master#9763',
        database='gestimprof$gestor'
    )
    mycursor = conexion.cursor()
    ind_deleg = request.form.get('ref_deleg', None)
    extraccion = "SELECT entrevistas.ident, entrevistas.fecha, entrevistas.hora, profesionales.nombre, applys.especialidad,  empresas.empresa, delegs.poblacion FROM entrevistas " \
                 "INNER JOIN profesionales ON profesionales.cod_prof=entrevistas.codprof LEFT JOIN delegs ON delegs.cod=entrevistas.cod_deleg INNER JOIN empresas ON " \
                 "empresas.ref=delegs.ref INNER JOIN marcas ON marcas.idmarca=entrevistas.idmarca INNER JOIN applys ON applys.idapply=marcas.codapply WHERE " \
                 "entrevistas.cod_deleg=%s; AND entrevistas.estado!='RECHAZO' ORDER BY fecha asc, hora asc "
    variable = [ind_deleg]
    lista_citas = []
    mycursor.execute(extraccion, variable)
    filas = mycursor.fetchall()
    for fila in filas:
        lista_citas.append(fila)
    mycursor.close()
    conexion.close()
    return lista_citas


# ================================================================================================================
def process_error(message, next_page):
    """

    :param message:
    :param next_page:
    :return:
    """
    return render_template("error.html", error_message=message, next=next_page)


app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'  # this string is used for security reasons (see CSRF)

# start the server with the 'run()' method
# if __name__ == '__main__':
#    if (sys.platform == 'darwin') or (sys.platform == 'linux'):  # different port if running on Windows
#        app.run(debug=True, port=8080)
#    #        app.run(debug=False)
#    else:
#        app.run(debug=True, port=80)
#        app.run(debug=False)
