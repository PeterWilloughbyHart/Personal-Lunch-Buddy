INSERT INTO lunchbuddy_user (username, password, name, age, bio, email, city, state, zip, img)
VALUES
($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);

SELECT * FROM lunchbuddy_user;