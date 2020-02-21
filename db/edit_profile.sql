UPDATE lunchbuddy_user SET 
name = $2,
age = $3,
bio = $4,
email = $5,
phone = $6,
city = $7,
state = $8,
zip = $9,
img = $10
WHERE username = $1;

SELECT * FROM lunchbuddy_user WHERE username = $1