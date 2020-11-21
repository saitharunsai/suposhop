from flask_sqlalchemy import SQLAlchemy
import os
from datetime import datetime
db = SQLAlchemy()

class User(db.Model):
    phonenumber = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(255), nullable=True)
    lastName = db.Column(db.String(255), nullable=True)
    email = db.Column(db.String(200), nullable=False, unique=True)
    password = db.Column(db.String(100),nullable=False)
    SQLAlchemy = ''' INSERT INTO User(phonenumbe,firstName,lastName,email,password)
              VALUES(?,?,?,?,?) '''