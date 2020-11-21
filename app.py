from flask import Flask, jsonify, request
from models import db, User
from flask import Flask
from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy
from flask import Flask, jsonify, request, abort
from sqlalchemy.dialects import postgresql
import psycopg2
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:saitharun@123@localhost/suposhop'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
app.debug = True


@app.route("/auth/Signup", methods=["POST"])
def register():
    phonenumber=request.get_json().get('phonenumber')
    firstName = request.get_json().get('firstName')
    lastName = request.get_json().get('lastName')
    email = request.get_json().get('email')
    password = request.get_json().get('password')
    user = User.query.filter_by(phonenumber=phonenumber).first()
    if user is not None:
        return jsonify({'status': 'username already exists'})
    else:
        newUser = User(phonenumber=phonenumber,
                       lastName=lastName,
                       firstName=firstName,
                       email=email,
                       password=generate_password_hash(password, method='sha256'))
        db.session.add(newUser)
        db.session.commit()
        return jsonify({'status': 'successful'})


@app.route('/auth/login', methods=['POST'])
def login():
    phonenumber = request.get_json().get('phonenumber')
    password = request.get_json().get('password')
    user = User.query.filter_by(phonenumber=phonenumber).first()
    if user is None:
        return jsonify({'status': 'invalid username'})
    elif not check_password_hash(user.password, password):
        return jsonify({'status': 'credentials do not match'})
    else:
        access_token = create_access_token(identity={
            'firstName': user.firstName,
            'lastName': user.lastName,
            'phonenumber': user.phonenumber
        })
        return jsonify({'token': access_token, 'status': 'successful'})


if __name__ == '__main__':
    app.run()
