import api
import json
import os
import argparse

parser = argparse.ArgumentParser(description='Process some integers.')
parser.add_argument('-s',  default='users.json', help='source file with users as JSON')
args = parser.parse_args()

if not os.environ['CYPRESS_TEST_PASSWORD']:
    raise Exception('DHIS2 password for test accounts not set')

def load_users():
    file = open(args.source, "r")
    contents = file.read()
    return json.loads(contents)


def persist_users(users):
    print(len(users),'users loaded')
    for user in users:
        user['userCredentials']['password'] = os.environ['CYPRESS_TEST_PASSWORD']
        res = api.post('users.json', user)
        print(res)


persist_users(load_users())