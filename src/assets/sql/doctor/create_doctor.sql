INSERT INTO
    doctors (
        firstname,
        lastname,
        description,
        departmentid,
        username,
        contactnumber,
        email,
        dateofbirth,
        address,
        gender,
        image
    )
VALUES
    (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7,
        $8,
        $9,
        $10,
        $11
    );