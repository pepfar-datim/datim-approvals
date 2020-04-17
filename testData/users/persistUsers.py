#!/usr/bin/python

import api
import json
import os

def load_users():
    file = open("users.json", "r")
    contents = file.read()
    return json.loads(contents)


def persist_users(users):
    print(len(users),'users loaded')
    for user in users:
        try:
            api.delete('users/' + user['id'] + '.json')
        except:
            print("Not deleting user", user['id'])
        user['userCredentials']['password'] = os.environ['CYPRESS_TEST_PASSWORD']
        res = api.post('users.json', user)
        print(res)


persist_users(load_users())