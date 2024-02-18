SELECT
    username AS "username",
    password AS "password",
    full_name AS "fullName",
    email AS "email",
    phone AS "phoneNumber",
    address AS "address",
    COALESCE(ARRAY_AGG(roles.name) filter (where roles.name is not null), ARRAY[] :: TEXT[]) AS roles,
    created_at AS "createdAt"
FROM
    users
    LEFT JOIN user_roles ON users.username = user_roles.user_id
    LEFT JOIN roles ON user_roles.role_id = roles.role_id
WHERE
    users.username = $1
GROUP BY
    users.username,
    users.full_name,
    users.email,
    users.phone,
    users.address;