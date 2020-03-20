-- gets data for aggregateData.test.js
SELECT *
FROM analytics
WHERE pe='2019Q3'
AND dx='RhkU5KjtAi6'
AND (co='xjIOzgKKqaE' OR co='srbCCscTJaK' OR co='nsATUhYrzYh')

-- gets data for enteredData.test.js
SELECT *
FROM analytics
WHERE pe='2019Q3'
AND dx='Q7dzwYIVj9C'
AND (co='QPO0ZfoGC5D' OR co='l6gFAecb5ua')
