#!/usr/bin/bash

section(){
  echo ----------------------------
  echo $1
}

section Users \> Adding test user accounts
(cd users && ./persistUsers.py)

section DataStore \> Opening data entry periods for dedupes
(cd dataStore && ./dataStore.py)

section Mechanisms \> Submit mechanisms to expected level
(cd mechanisms && ./submitMechanisms.py)

section CORS \> Whitelist localhost
(cd cors && ./cors.py)