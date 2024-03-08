SELECT
    u.username AS "username",
    u.password AS "password",
    u.role AS "role",
    p.firstname AS "firstName",
    p.lastname AS "lastName",
    p.dateofbirth AS "dateOfBirth",
    p.gender AS "gender",
    p.contactnumber AS "contactNumber",
    p.email AS "email",
    p.image AS "image",
    p.address AS "address"
FROM
    [table_name] p
    INNER JOIN users u ON u.username = p.username
WHERE
    p.username = $1