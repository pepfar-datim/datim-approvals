#!/usr/bin/bash


#old
#"name": "OU India Agency HHS/CDC all mechanisms",
#"id": "dC7jwUgo23e"

#new
#"name": "OU Asia Region Agency HHS/CDC all mechanisms",
#"id": "y4kPXXeNzxe"

#old
#"name": "OU India Agency HHS/CDC users",
#"id": "aaJqXrV1NvU"

#new
#"name": "OU Asia Region Agency HHS/CDC users",
#"id": "dBW0Xm1YBkE"

#old
# "name": "OU India All mechanisms",
# "id": "ZiK5R9d001L"

#new
# "name": "OU Asia Region All mechanisms",
# "id": "Z67RKj0UUx6"

#old
# "name": "OU India Country team",
# "id": "f6wtRWtCqZ6"

#new
# "name": "OU Asia Region Country team",
# "id": "nArTNoncIZZ"

#old
# "name": "OU India Agency USAID users",
# "id": "tVzVUOed3zF"

#new
# "name": "OU Asia Region Agency USAID users",
# "id": "kCQ2gMvkkUg"


#old
# "name": "OU India MOH User administrators",
# "id": "bceRMHIksMJ"

#new
# "name": "OU Asia Region MOH User administrators",
# "id": "rkd3Ok4r0oe"

#old
# "name": "OU India Agency USAID all mechanisms",
# "id": "m1lYfdanqRQ"

#new
# "name": "OU Asia Region Agency USAID all mechanisms",
# "id": "vTUZSYiSom4"

#old
# "id": "hzDDL5XnD3f",
# "displayName": "OU India Agency USAID user administrators",

# new
# "name": "OU Asia Region Agency USAID user administrators",
# "id": "rutVB5w25IP"

# old
# "id": "ZH20mYbNuxG",
# "displayName": "OU Cambodia MOH Users",

# new
# "id": "DSBFkL4uzd2",
# "displayName": "OU Asia Region MOH Users"

userGroupUpdates=('dC7jwUgo23e->y4kPXXeNzxe' 'aaJqXrV1NvU->dBW0Xm1YBkE' 'ZiK5R9d001L->Z67RKj0UUx6' 'f6wtRWtCqZ6->nArTNoncIZZ' 'tVzVUOed3zF->kCQ2gMvkkUg' 'bceRMHIksMJ->rkd3Ok4r0oe' 'm1lYfdanqRQ->vTUZSYiSom4' 'hzDDL5XnD3f->rutVB5w25IP' 'ZH20mYbNuxG->DSBFkL4uzd2')

for i in ${userGroupUpdates[@]}; do
	echo $i
done