SELECT
    users.username AS "username",
    users.password AS "password",
    users.role AS "role",
    patients.firstname AS "firstName",
    patients.lastname AS "lastName",
    patients.dateofbirth AS "dateOfBirth",
    patients.gender AS "gender",
    patients.contactnumber AS "contactNumber",
    patients.email AS "email",
    patients.image AS "image",
    patients.address AS "address"
FROM
    users
    INNER JOIN patients ON users.username = patients.username
WHERE
    users.username = $1