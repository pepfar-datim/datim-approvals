import api

er = {"approvals":[{"aoc":"m0NndYanyMR","ou":"ptVxnBssua6"}],"pe":["2018Oct"],"wf":["WUD8TApgOu1"]}
target = {"approvals":[{"aoc":"ftafnQZ4uml","ou":"YM6xn5QxNpY"}],"pe":["2019Oct"],"wf":["TAjCBkG6hl6"]}

# return to pending at partner
api.post('dataApprovals/unapprovals', er)
api.post('dataApprovals/unapprovals', er)
api.post('dataApprovals/unapprovals', er)

# push to submitted by agency
api.post('dataApprovals/approvals', er) #submit by P
api.post('dataAcceptances/acceptances', er) #accept by A
api.post('dataApprovals/approvals', er) #submit by A

# return to pending at partner
api.post('dataApprovals/unapprovals', target)

# submit by partner
api.post('dataApprovals/approvals', target) #submit by P