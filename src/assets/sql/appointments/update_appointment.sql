UPDATE
  appointments
SET
  doctor_id = $2,
  patient_id = $3,
  start_time = $4,
  end_time = $5,
  appointment_purpose = $6
WHERE
  id = $1;