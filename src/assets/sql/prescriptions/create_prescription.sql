INSERT INTO
  prescriptions (appointment_id, notes, created_at)
VALUES
  ($1, $2, CURRENT_TIMESTAMP) RETURNING id;