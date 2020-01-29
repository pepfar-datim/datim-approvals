import api
import json
import os
import sys

sourcefile = 'users.json'
if len(sys.argv)>1:
    sourcefile = sys.argv[1]

if not os.environ['CYPRESS_TEST_PASSWORD']:
    raise Exception('DHIS2 password for test accounts not set')

def load_users():
    file = open(sourcefile, "r")
    contents = file.read()
    return json.loads(contents)


def persist_users(users):
    print(len(users),'users loaded')
    for user in users:
        user['userCredentials']['password'] = os.environ['CYPRESS_TEST_PASSWORD']
        res = api.post('users.json', user)
        print(res)


persist_users(load_users())