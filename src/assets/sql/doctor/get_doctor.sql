SELECT
    doctors.firstname AS "firstName",
    doctors.lastname AS "lastName",
    doctors.description AS "description",
    departments.departmentname AS "department",
    doctors.contactnumber AS "contactNumber",
    doctors.email AS "email",
    doctors.dateofbirth AS "dateOfBirth",
    doctors.address AS "address",
    doctors.gender AS "gender",
    doctors.image AS "image"
FROM
    doctors
    INNER JOIN departments ON doctors.departmentid = departments.departmentid
WHERE
    doctors.username = $1;