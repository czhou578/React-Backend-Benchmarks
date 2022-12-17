import mysql.connector
from flask import Flask, jsonify, request
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
    return queryResult


def executeJoin(cursor=mydbcursor):
    cursor.execute(
        "select count(employeeId) from employeeterritory natural join region natural join territory group by regionId")
    queryResult = cursor.fetchall()
    print(queryResult)

    return queryResult


def executeInsert(cursor=mydbcursor):
    cursor.execute(
        "Insert into category (categoryName, description, picture) values ('Seafood', 'tasty', null)")


def executeUpdate(cursor=mydbcursor):
    cursor.execute(
        "Update product set productName = 'Product 1' where productId = 55")


@app.route('/python/all-shippers', methods=['GET'])
def requesting():
    iterations = request.args.get('iteration')
    print(iterations)
    returnData = []
    # mydbcursor = mydb.cursor()

    for x in range(int(iterations)):
        mydbcursor = executeSelect()
        returnData.append(mydbcursor)
        # mycursor.execute("SELECT * FROM shipper")
        # queryResult = mycursor.fetchall()
        # print(queryResult)
        # print(data)
        # mycursor.close()

    return jsonify(returnData)


@app.route('/python/count-employee-id', methods=['GET'])
def processCountEmployeeId():
    iterations = request.args.get('iteration')
    print(iterations)
    returnData = []

    for x in range(int(iterations)):
        fetchedData = executeJoin()
        returnData.append(fetchedData)
    return jsonify(returnData)


@app.route('/python/new-category', methods=['POST'])
def addNewCategory():
    iterations = request.args.get('iteration')
    returnData = "Data successfully inserted!"

    for x in range(int(iterations)):
        execute = executeInsert()
        print(execute)

    return jsonify(returnData)


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080)
