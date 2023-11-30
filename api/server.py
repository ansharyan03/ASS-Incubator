import random
import time
import json
import sys

from flask import Flask, request, redirect, url_for, jsonify
from flask_cors import CORS, cross_origin
from mysql.connector import Error as SQLError
from mysql.connector.errors import IntegrityError
from dbutil import DavisDB as DB
from os import environ as env

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
davis = DB(host="sql", password="ASS42069")
if len(sys.argv) == 2:
    davis.host = sys.argv[1]

@app.route("/init", methods=["GET"])
def init():
    try:
        davis.init()
        return redirect("/checkin")
    except SQLError as e:
        return {"errormsg": e.msg}
    
@app.route("/checkin", methods=["GET", "POST"])
def checkin():
    if request.method == "GET":
        return "hello from checkin"

    if request.method == "POST":
        data = request.get_json()
        try:
            davis.checkin(data["user"], data["floor"], data["note"])
            return data
        except KeyError as e:
            return {"errormsg": "user data not found"}
        except SQLError as e:
            return {"errormsg": e.msg}
        return "successfully checked in"

@app.route("/checkout", methods=["GET", "POST"])
def checkout():
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

@app.route("/view", methods=["GET"])
def view():
    try:
        users = davis.floor_count()
        return {"counts": users}
    except BaseException as e:
        return {"errormsg": davis.floor_count()}

@app.route("/view/floor/<int:floor>")
def floorview(floor: int):
    try:
        users = davis.floor_view(floor)
        return users
    except BaseException as e:
        return {"errormsg": e}

if __name__ == "__main__":
    app.run("0.0.0.0", port=8000, debug=True)
