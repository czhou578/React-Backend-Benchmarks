import database
from flask import Flask, jsonify

app = Flask(__name__)


@app.route('/api/all-customers', methods=['GET'])
def requesting():
    database.mycursor.execute("SELECT * FROM customer")
    result = database.mycursor.fetchall()
    print(result)
    return jsonify(result)


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080)
