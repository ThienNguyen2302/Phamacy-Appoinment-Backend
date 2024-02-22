SELECT
    patients.firstname AS "firstName",
    patients.lastname AS "lastName",
    patients.dateofbirth AS "dateOfBirth",
    patients.gender AS "gender",
    patients.contactnumber AS "contactNumber",
    patients.email AS "email",
    patients.image AS "image",
    patients.address AS "address"
FROM
    patients
WHERE
    patients.username = $1