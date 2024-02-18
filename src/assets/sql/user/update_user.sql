UPDATE
    test_users
SET
    full_name = $2,
    day_of_birth = $3
where username = $1