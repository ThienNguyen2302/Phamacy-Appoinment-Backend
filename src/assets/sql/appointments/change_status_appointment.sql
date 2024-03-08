UPDATE
  appointments
SET
  appointment_status = $2
WHERE
  id = $1;