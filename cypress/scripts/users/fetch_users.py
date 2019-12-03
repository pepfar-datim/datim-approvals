import api
import json

def fetch_users():
    params = {
        'fields': '*',
        'filter': 'userCredentials.username:$like:approvals',
        'filter': 'userCredentials.username:$like:cypress',
        'rootJunction': 'OR'
    }
    res = api.get('users.json', params)
    print('Fetched',len(res['users']),'users')
    return res['users']

def save_users(users):
    file = open("users.json", "w")
    file.write(json.dumps(users))
    file.close()

users = fetch_users()
save_users(users)