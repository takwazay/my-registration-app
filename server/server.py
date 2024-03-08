import mysql.connector

try:
    connection = mysql.connector.connect(database='ynov_ci',user='root',password='ynovpwd')

    sql_select_Query = "select * from utilisateur"
    cursor = connection.cursor()
    cursor.execute(sql_select_Query)
    # get all records
    records = cursor.fetchall()
    print("Total number of rows in table: ", cursor.rowcount)

except mysql.connector.Error as e:
    print("Error reading data from MySQL table", e)
finally:
    if connection.is_connected():
        connection.close()
        cursor.close()
        print("MySQL connection is closed")

        