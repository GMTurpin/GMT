
import mysql.connector
def conectar():
    database = mysql.connector.connect(
        host='gestimprof.mysql.pythonanywhere-services.com',
        port=3306,
        user='gestimprof',
        password='master#9763',
        database='gestimprof$gestor'
    )
    mycursor = database.cursor(buffered=True)

    return [database,mycursor]
