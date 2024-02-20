INSERT INTO
  patients (
    username,
    firstname,
    lastname,
    dateofbirth,
    gender,
    contactnumber,
    email,
    image,
    address
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
    $9
  );