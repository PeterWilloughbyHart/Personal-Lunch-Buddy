UPDATE lunchbuddy_user SET 
username = $2,
name = $3,
age = $4,
bio = $5,
email = $6,
city = $7,
state = $8,
zip = $9,
img = $10
WHERE username = $1;

SELECT * FROM lunchbuddy_user;