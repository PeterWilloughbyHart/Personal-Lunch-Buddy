SELECT *,
      ROUND(69* DEGREES(ACOS(COS(RADIANS(latpoint))
                * COS(RADIANS(lat))
                * COS(RADIANS(longpoint) - RADIANS(lng))
                + SIN(RADIANS(latpoint))
                * SIN(RADIANS(lat))))) AS distance_in_miles
FROM user_location
JOIN (
    SELECT  $1  AS latpoint,  $2 AS longpoint
  ) AS p ON 1=1
JOIN lunchbuddy_user on lunchbuddy_user.id = user_location.user_id
WHERE user_location.user_id NOT IN ($3) AND ROUND(69* DEGREES(ACOS(COS(RADIANS(latpoint))
                * COS(RADIANS(lat))
                * COS(RADIANS(longpoint) - RADIANS(lng))
                + SIN(RADIANS(latpoint))
                * SIN(RADIANS(lat))))) < 25
ORDER BY RANDOM()
LIMIT 10