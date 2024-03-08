SELECT
    username AS "username",
    password AS "password",
    role AS "role"
FROM
    users
WHERE
    username = $1