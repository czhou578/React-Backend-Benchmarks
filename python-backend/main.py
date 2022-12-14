import mysql.connector
from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
import time

app = Flask(__name__)
CORS(app)

mydb = mysql.connector.connect(
    host="127.0.0.1",
    user="root",
    password="password",
    database="northwind"
)

mydbcursor = mydb.cursor()


def executeSelect(cursor=mydbcursor):
    cursor.execute("SELECT * FROM shipper")
    queryResult = cursor.fetchall()
    print(queryResult)
    data = jsonify(queryResult)
    print(data)


@app.route('/python/all-shippers', methods=['GET'])
def requesting():
    # mydbcursor = mydb.cursor()

    # mycursor = mydb.cursor()
    # mycursor.ex
    for x in range(3):
        mydbcursor = executeSelect()
        # mycursor.execute("SELECT * FROM shipper")
        # queryResult = mycursor.fetchall()
        # print(queryResult)
        # print(data)
        # mycursor.close()

    return "hi"


@app.route('/python/count-employee-id', methods=['GET'])
def processCountEmployeeId():

    # mycursor = mydb.cursor()
    mycursor.execute(
        "select count(employeeId) from employeeterritory natural join region natural join territory group by regionId")
    queryResult = mycursor.fetchall()
    data = jsonify(queryResult)
    mycursor.close()
    return data


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080)
