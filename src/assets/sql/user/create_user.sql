INSERT INTO
    users (
        username,
        password,
        full_name,
        email,
        phone,
        address,
        created_at
    )
VALUES
($1, $2, $3, $4, $5, $6, now());