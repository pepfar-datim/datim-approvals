import requests
import os

api = os.environ['DHIS_BASEURL'] + '/api/'
credentials = (os.environ['DHIS_USERNAME'], os.environ['DHIS_PASSWORD'])

print('Connecting to DHIS2: ' + api)

res = requests.get(api + 'resources.json', auth=credentials)
if res.json()['resources'][0]:
    print('Connected to DHIS 2 using ' + api)

def get(url, params):
    res = requests.get(api + url, auth=credentials, params=params)
    process_status_code(res, 'get')

def delete(url):
    res = requests.delete(api + url, auth=credentials)
    process_status_code(res, 'delete')


def post(url, body):
    res = requests.post(api + url, auth=credentials, json=body)
    process_status_code(res, 'post')

def process_status_code(response, method):
    if response.status_code in range(200,210):
        print(method + ' to url ' + response.url + ' successful')
    else:
        print(method + ' to url ' + response.url + ' failed')
        print(response.json()['message'])