INSERT INTO user_location (lat, lng, user_id)
VALUES ($1, $2, $3);

SELECT * FROM user_location;