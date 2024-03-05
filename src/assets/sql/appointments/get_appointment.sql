SELECT
  appointments.id AS "id",
  JSON_BUILD_OBJECT(
    'id',
    doctors.doctorid,
    'name',
    doctors.firstname || ' ' || doctors.lastname
  ) AS "doctor",
  JSON_BUILD_OBJECT(
    'id',
    patients.patientid,
    'name',
    patients.firstname || ' ' || patients.lastname
  ) AS "patient",
  appointments.start_time AS "startTime",
  appointments.end_time AS "endTime",
  appointments.appointment_purpose AS "purpose",
  appointments.appointment_status AS "status"
FROM
  appointments
  INNER JOIN doctors ON appointments.doctor_id = doctors.doctorid
  INNER JOIN patients ON appointments.patient_id = patients.patientid
WHERE
  id = $1;