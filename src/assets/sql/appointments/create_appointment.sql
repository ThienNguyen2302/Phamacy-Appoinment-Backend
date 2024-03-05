INSERT INTO
  appointments (
    doctor_id,
    patient_id,
    start_time,
    end_time,
    appointment_purpose,
    appointment_status
  )
VALUES
  (
    $1,
    $2,
    $3,
    $4,
    $5,
    $6
  );