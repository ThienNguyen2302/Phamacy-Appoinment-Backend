SELECT
  doctors.doctorid AS "id",
  doctors.firstname || ' ' || doctors.lastname AS "name",
  ARRAY(
    SELECT
      JSON_BUILD_OBJECT (
        'patient',
        JSON_BUILD_OBJECT(
          'id',
          patients.patientid,
          'name',
          patients.firstname || ' ' || patients.lastname
        ),
        'startTime',
        appointments.start_time,
        'endTime',
        appointments.end_time,
        'purpose',
        appointments.appointment_purpose,
        'status',
        appointments.appointment_status
      )
    FROM
      appointments
      INNER JOIN patients ON appointments.patient_id = patients.patientid
    WHERE
      appointments.appointment_status = 'approve'
      AND (
        appointments.start_time BETWEEN $2 AND $3
        OR appointments.end_time BETWEEN $2 AND $3
        OR (appointments.start_time <= $2 AND appointments.end_time >= $3)
      )
  ) AS "appointments"
FROM
  doctors
WHERE
  doctors.doctorid = $1;