from flask import Flask, request
from flask import jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
from config import config

import uuid

app = Flask(__name__)
CORS(app)

# connect to MongoDB
app.config["MONGO_URI"] = config["URI_DB"]
mongodb_client = PyMongo(app)
db = mongodb_client.db

#service 1
@app.route("/auth/login", methods=["POST"])
def login():
    #get request data
    username = request.form["username"]
    password = request.form["password"]

    #validate data (exists? y/n)
    user = db.users.find_one({"username": username})
    if not user:
        return jsonify({
            "status": "warning",
            "message": "Usuario no encontrado"
        })
    
    if user["password"] == password:
        response = {
            "status": "OK",
            "username": user["username"],
            "name": user["name"],
            "last_name": user["last_name"],
            "email": user["email"]
        }
    else:
        response = {
            "status": "warning",
            "message": "Los datos ingresados son incorrectos"
        }
    return jsonify(response)

@app.route("/user", methods=["POST"])
def create_user():
    #get request data
    data_user = request.get_json()

    #uuid
    uuid_number = uuid.uuid1()

    # complement user data
    data_user["uuid"] = str(uuid_number)
    data_user["status"] = "ACTIVE"

    #save user data
    user = db.users.insert(data_user)

    if user:
        response = {
            "name": data_user["name"],
            "last_name": data_user["last_name"],
            "phone_number": data_user["phone_number"],
            "email": data_user["phone_number"],
            "uuid": data_user["uuid"],
            "status": data_user["status"]
        }
    else:
        response = {
            "status": "error",
            "message": "No se ha podido guardar los datos."
        }
    return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True)