import mysql.connector
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from fetch import getData
import time
import redis
import json

import requests

app = Flask(__name__)
redis_client = redis.Redis(host='localhost', port=6379, db=0)

CORS(app)

mydb = mysql.connector.connect(
    host="127.0.0.1",
    user="root",
    password="Issaquah@411",
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


def executeDelete(cursor=mydbcursor):
    cursor.execute("delete from salesorder order by orderId desc limit 1")


@app.route('/python/all-shippers', methods=['GET'])
def requesting():


    start_time = time.perf_counter()

    value = redis_client.get('shippers')
    if value:
        return jsonify(value.decode('utf-8'))

    iterations = request.args.get('iteration')
    print(iterations)
    returnData = []
    # mydbcursor = mydb.cursor()

    for x in range(int(iterations)):
        mydbcursor = executeSelect()
        returnData.append(mydbcursor)
    
    redis_client.set('shippers', json.dumps(returnData))

    end_time = time.perf_counter()
    elapsed_time = end_time - start_time
    elapsed_time = 1000 * elapsed_time

    returnData.append("Operation Time took " + str(elapsed_time) + " milliseconds")

    return jsonify(returnData)


@app.route('/python/count-employee-id', methods=['GET'])
def processCountEmployeeId():
    start_time = time.perf_counter()

    iterations = request.args.get('iteration')
    print(iterations)
    returnData = []

    for x in range(int(iterations)):
        fetchedData = executeJoin()
        returnData.append(fetchedData)

    end_time = time.perf_counter()
    elapsed_time = end_time - start_time
    elapsed_time = 1000 * elapsed_time
    returnData.append("Operation Time took " + str(elapsed_time) + " milliseconds")

    return jsonify(returnData)


@app.route('/python/new-category', methods=['POST'])
def addNewCategory():
    start_time = time.perf_counter()

    iterations = request.args.get('iteration')
    returnData = "Data successfully inserted!"

    for x in range(int(iterations)):
        execute = executeInsert()
        print(execute)

    end_time = time.perf_counter()
    elapsed_time = end_time - start_time
    elapsed_time = 1000 * elapsed_time
    returnData += " Operation Time took " + str(elapsed_time) + " milliseconds"

    return jsonify(returnData)


@app.route('/python/update-customer', methods=['PUT'])
def updateCustomer():
    start_time = time.perf_counter()
    iterations = request.args.get('iteration')

    for x in range(int(iterations)):
        data = executeUpdate()

    end_time = time.perf_counter()
    elapsed_time = end_time - start_time
    elapsed_time = 1000 * elapsed_time

    return jsonify("Data Inserted! Operation time took " + str(elapsed_time) + " milliseconds")


@app.route("/python/delete-salesorder", methods=['DELETE'])
def deleteSalesorder():
    start_time = time.perf_counter()


    iterations = request.args.get('iteration')
    mydb.start_transaction()

    for x in range(int(iterations)):
        data = executeDelete()
    
    mydb.commit()

    end_time = time.perf_counter()
    elapsed_time = end_time - start_time
    elapsed_time = 1000 * elapsed_time

    return jsonify("Data deleted! Operation time took " + str(elapsed_time) + " milliseconds")


@app.route("/python/graphql/get", methods=['GET'])
def getCeoRoadster():
    iterations = request.args.get('iteration')
    result = []

    body = """
        query ExampleQuery {
        company {
            ceo
        }
        roadster {
            apoapsis_au
        }
        }

    """
    url = 'https://api.spacex.land/graphql/'

    for x in range(int(iterations)):
        r = requests.post(url=url, json={"query": body})
        result.append(r.text)

    print(r.text)
    return result

def requestPerson():
    result = getData()
    return result.stdout.decode('utf-8')


if __name__ == '__main__':
    app.run(host='192.168.81.153', port=8080)
