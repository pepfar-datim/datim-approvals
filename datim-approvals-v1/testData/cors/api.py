import requests
import os

api = os.environ['DHIS_BASEURL'] + '/api/'
credentials = (os.environ['DHIS_USERNAME'], os.environ['DHIS_PASSWORD'])

res = requests.get(api + 'resources.json', auth=credentials)
if res.json()['resources'][0]:
    print('Connected to DHIS2: ' + api)
else:
    raise Exception("Cannot connect to DHIS2: " + api)

def get(url, params):
    res = requests.get(api + url, auth=credentials, params=params)
    process_status_code(res, 'get')
    return res.json()

def delete(url):
    res = requests.delete(api + url, auth=credentials)
    process_status_code(res, 'delete')


def post(url, body):
    res = requests.post(api + url, auth=credentials, json=body)
    process_status_code(res, 'post')

def formPost(url, data):
    headers = {'Content-Type': 'application/x-www-form-urlencoded'}
    res = requests.post(api + url, auth=credentials, data=data, headers=headers)
    process_status_code(res, 'post')

def put(url, body):
    res = requests.put(api + url, auth=credentials, json=body)
    process_status_code(res, 'put')

def process_status_code(response, method):
    if response.status_code in range(200,210):
        print(method + ' to url ' + response.url + ' successful')
    else:
        print(method + ' to url ' + response.url + ' failed')
        try:
            print(response.json())
        except:
            print(response)