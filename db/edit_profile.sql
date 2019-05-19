UPDATE lunchbuddy_user SET 
username = $2,
name = $3,
age = $4,
bio = $5,
email = $6,
phone = $7,
city = $8,
state = $9,
zip = $10,
img = $11
WHERE username = $1;

SELECT * FROM lunchbuddy_user;