import requests

api = 'https://dev-jakub.datim.org/api/'
credentials = ('bao-admin', 'Soller29-Seafowl10')

#api = 'https://dev.datim.org/api/'
#credentials = ('bao-admin', 'Savaged21-Ree24')

res = requests.get(api + 'resources.json', auth=credentials)
if res.json()['resources'][0]:
	print('Connected to DHIS 2 using ' + api)

def get(url, params):
	res = requests.get(api + url, auth=credentials, params=params)
	return res.json()

def post(url, body):
	res = requests.post(api + url, auth=credentials, json=body)
	if res.status_code < 200 or res.status_code > 204:
		print('\n\n', 'ERROR', 'user', body, 'status code', res.status_code)
		print('server response', res.text)
	return res.json()