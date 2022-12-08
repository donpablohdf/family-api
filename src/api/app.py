"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory, make_response
from flask_cors import CORS
from utils import APIException, generate_sitemap
from datastructures import FamilyStructure
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
from models import db

import datetime
from datetime import timedelta
import jwt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required



app = Flask(__name__)
jwt_app = JWTManager(app)
app.config["JWT_HEADER_TYPE"] = "Bearer"
ACCESS_EXPIRES = timedelta(hours=1)
app.config["JWT_SECRET_KEY"] = os.environ.get('FLASK_APP_KEY', 'sample key')
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = ACCESS_EXPIRES
app.config['JWT_TOKEN_LOCATION'] = ['headers']
app.config['JWT_BLACKLIST_ENABLED'] = True
app.config["JWT_ALGORITHM"] = "HS256"
#app.config['JWT_IDENTITY_CLAIM'] = 'iss'

app.url_map.strict_slashes = False

# database configuration

db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
app.app_context().push()
db.create_all()
CORS(app)


# create the jackson family object
jackson_family = FamilyStructure("Jackson")

# Handle/serialize errors like a JSON object
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints
@app.route('/')
def sitemap():
    return generate_sitemap(app)

@app.route('/members', methods=['GET'])
def handle_hello():
    # Todos los miembros
    members = jackson_family.get_all_members()
    return jsonify(members), 200

@app.route('/member/<int:member_id>/', methods=['GET'])
def handle_member(member_id):
    # miembro por id
    member = jackson_family.get_member(member_id)
    return jsonify(member), 200

@app.route('/login', methods=['POST', 'GET'])
def login_user():
    data = request.get_json()
    SECRET = os.getenv('FLASK_APP_KEY')  # variable ENV

    if not data:
        return make_response('could not verify', 401, {'WWW.Authentication': 'Basic realm: "login required"'})

    user = str(data['username'])
    passw= data['password']
    if user == 'admin' and passw =='1234':
        token = jwt.encode({'admin': user, 'exp': datetime.datetime.utcnow(
            ) + ACCESS_EXPIRES}, SECRET)
        access_token = create_access_token(token)
        return make_response({"token": access_token}), 200
    return make_response('Fallo al verificar usuario',  401, {'WWW.Authentication': 'Basic realm: "login required"'})

@app.route('/delete', methods=['POST'])
@jwt_required()
def handle_delete():
    # Borrar miembro
    data = request.get_json()
    delete = jackson_family.delete_member( data["id"])
    if delete:
        return jsonify({"delete": data["id"]}), 200
    return jsonify("No se ha podido borrar"), 400

# this only runs if `$ python src/app.py` is executed
if __name__ == '__main__':
    load_dotenv()
    PORT = int(os.environ.get('PORT', 3000))
    app.run(host='0.0.0.0', port=PORT, debug=True)
