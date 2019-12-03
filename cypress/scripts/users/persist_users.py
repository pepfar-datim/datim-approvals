import api
import json

def load_users():
    file = open("users.json", "r")
    contents = file.read()
    return json.loads(contents)


def persist_users(users):
    print(len(users),'users loaded')
    for user in users:
        user['userCredentials']['password'] = "blank"
        res = api.post('users.json', user)
        print(res)


persist_users(load_users())