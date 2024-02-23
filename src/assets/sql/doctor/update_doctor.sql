UPDATE
    doctors
SET
    firstname = $2,
    lastname = $3,
    description = $4,
    departmentid = $5,
    contactnumber = $6,
    email = $7,
    dateofbirth = $8,
    address = $9,
    gender = $10,
    image = $11
WHERE
    username = $1