UPDATE user_location SET lat = $1, lng = $2 WHERE user_id = $3;

SELECT * FROM user_location WHERE user_id = $3;