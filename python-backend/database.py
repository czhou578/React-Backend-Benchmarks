import mysql.connector

mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="password",
    database="northwind"
)

mycursor = mydb.cursor()
