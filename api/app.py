from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects import postgresql
import psycopg2

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:saitharun@123@localhost/suposhop'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.debug = True
db = SQLAlchemy(app)

class User(db.Model):
    phonenumber = db.Column(db.Integer, primary_key=True)
    fname = db.Column(db.String(255), nullable=True)
    lname = db.Column(db.String(255), nullable=True)
    email = db.Column(db.String(200), nullable=False, unique=True)
    password = db.Column(postgresql.BYTEA, nullable=False)

    def __init__(self,phonenumber,fname,lname,email,password):
        self.phonenumber = phonenumber
        self.fname =fname
        self.lname =lname
        self.email =email
        self.password=password







if __name__ == "__main__":
    app.run()