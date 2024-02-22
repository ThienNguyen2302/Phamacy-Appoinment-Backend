UPDATE
    patients
SET
    firstname = $2,
    lastname = $3,
    dateofbirth = $4,
    gender = $5,
    contactnumber = $6,
    email = $7,
    image = $8,
    address = $9
WHERE
    username = $1;