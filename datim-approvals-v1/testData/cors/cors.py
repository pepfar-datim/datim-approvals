#!/usr/bin/python3

import api

api.post('configuration/corsWhitelist', ["http://localhost:3000","http://localhost:3001","http://localhost:3002","http://localhost:3003","http://localhost:3004","http://localhost:3005"])