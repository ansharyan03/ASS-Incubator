import random
import time
import json

from flask import Flask, request, redirect, url_for, jsonify
from flask_cors import CORS, cross_origin
from mysql.connector import Error as SQLError
from mysql.connector.errors import IntegrityError
from dbutil import DavisDB as DB
from os import environ as env

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

davis = DB(password="ASS42069")

@app.route("/init", methods=["GET"])
def init():
    try:
        davis.init()
        return redirect("/checkin")
    except SQLError as e:
        return {"errormsg": e.msg}
    
@app.route("/checkin/<string:user>/<int:floor>", methods=["GET", "POST"])
def checkin(user, floor):
    if request.method == "GET":
        try:
            davis.checkin(user, floor, "")
        except IntegrityError as e:
            return {"errormsg": f"user already checked in: {e.msg}"}
        return "hello from checkin"

    if request.method == "POST":
        data = request.get_json()
        try:
            davis.checkin(data["user"], data["floor"], data["note"])
        except KeyError as e:
            return {"errormsg": "user data not found"}
        except SQLError as e:
            return {"errormsg": e.msg}
        return "successfully checked in"

@app.route("/checkout/<string:user>", methods=["GET", "POST"])
def checkout(user):
    if request.method == "GET":
        try:
            davis.checkout(user)
        except SQLError as e:
            return {"errormsg": e.msg}
        return "hello from checkout"

    if request.method == "POST":
        data = request.get_json()
        success = False
        try:
            success = davis.checkout(data["user"])
        except KeyError as e:
            return {"errormsg": "user data not found"}
        except SQLError as e:
            return {"errormsg": e.msg}
        if success:
            return {"msg": "user dropped"}
        return {"errormsg": "user could not be dropped. try again."}

    

if __name__ == "__main__":
    app.run("0.0.0.0", port=8000, debug=True)