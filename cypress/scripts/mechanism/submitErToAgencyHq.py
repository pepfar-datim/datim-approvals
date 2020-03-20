import api

def request(action):
    body = {"approvals":[{"aoc":"m0NndYanyMR","ou":"ptVxnBssua6"}],"pe":["2018Oct"],"wf":["WUD8TApgOu1"]}
    api.post(action, body)

# return to pending at partner
request('dataApprovals/unapprovals')
request('dataApprovals/unapprovals')
request('dataApprovals/unapprovals')

# push to submitted by agency
request('dataApprovals/approvals') #submit by P
request('dataAcceptances/acceptances') #accept by A
request('dataApprovals/approvals') #submit by A