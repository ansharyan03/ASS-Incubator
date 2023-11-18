import mysql.connector
import csv
import os
import datetime
from random import random as rand

# database class
class DBBase:
    def __init__(self, host="localhost", user="root", password=""):
        self.host = host
        self.user = user
        self.password = password
        self.links = {}

    def connect(self):
        try:
            # connect to db
            cnx = mysql.connector.connect(
                host=self.host, user=self.user, password=self.password
            )
            cnx.cursor()
            return cnx
        except mysql.connector.Error as e:
            return e.msg
        except AttributeError as e:
            print(cnx)
            return ""

# abbreviated db commands
drop_db = "DROP DATABASE IF EXISTS users"
create_db = "CREATE DATABASE users"
create_table = """CREATE TABLE `users`.`checkedIn` (
`user` VARCHAR(16) NOT NULL,
  `time` VARCHAR(32) NOT NULL,
  `floor` INT NOT NULL,
  `note` VARCHAR(128) NULL,
  PRIMARY KEY (`user`),
  UNIQUE INDEX `user_UNIQUE` (`user` ASC) VISIBLE);"""
check_in = "INSERT INTO users.checkedIn VALUES (%s, %s, %s, %s)"
find_user = "SELECT * FROM users.checkedIn WHERE user=%s"
drop_user = "DELETE FROM users.checkedIn WHERE user=%s"

# Davis db class
class DavisDB(DBBase):
    def init(self):
        self.cnx = self.connect()
        if(type(self.cnx) == str):
            raise mysql.connector.Error(self.cnx)
        with self.cnx.cursor() as cursor:
            cursor.execute(drop_db)
            cursor.execute(create_db)
            cursor.execute(create_table)
        self.cnx.commit()
        self.cnx.close()
    
    # check in method for Davis user
    def checkin(self, user: str, floor: int, note: str = ""):
        self.cnx = self.connect()
        if(type(self.cnx) == str):
            raise mysql.connector.Error(self.cnx)
        with self.cnx.cursor() as cursor:
            cursor.execute(check_in, (user, str(datetime.datetime.now()), floor, note))
        self.cnx.commit()
        self.cnx.close()
    
    # check out for Davis user
    def checkout(self, user: str):
        self.cnx = self.connect()
        users = []
        if(type(self.cnx) == str):
            raise mysql.connector.Error(self.cnx)
        with self.cnx.cursor() as cursor:
            cursor.execute("SELECT * FROM users.checkedIn;")
            users.append(cursor.fetchall())
            cursor.execute(drop_user, (user,))
            cursor.execute("SELECT * FROM users.checkedIn")
            users.append(cursor.fetchall())
        self.cnx.commit()
        self.cnx.close()
        return (len(users[0])-len(users[1]) == 1)

    # show list of users currently in Davis
    def view(self):
        self.cnx = self.connect()
        all_users = []
        if(type(self.cnx) == str):
            raise mysql.connector.Error(self.cnx)
        with self.cnx.cursor() as cursor:
            cursor.execute("SELECT * FROM users.checkedIn;")
            users = cursor.fetchall()
            for user in users:
                all_users.append({"user": user[0], "floor": user[1], "note": user[2]})
        self.cnx.commit()
        self.cnx.close()
        return all_users