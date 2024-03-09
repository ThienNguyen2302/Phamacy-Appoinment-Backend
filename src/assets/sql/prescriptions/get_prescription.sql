WITH subtable AS (
  SELECT
    pd.prescription_id AS prescriptionId,
    pt.prescription_type_name AS typeName,
    ARRAY_AGG(
      JSON_BUILD_OBJECT(
        'notes',
        pd.notes,
        'examinationContent',
        pd.examination_content,
        'classification',
        pd.classification
      )
    ) AS details
  FROM
    prescription_details pd
    INNER JOIN prescription_types pt ON pd.prescription_types_id = pt.id
  WHERE
    pd.prescription_id = $1
  GROUP BY
    pd.prescription_id,
    pt.id
)
SELECT
  p.id AS "prescriptionId",
  json_build_object(
    'doctor',
    d.firstname || ' ' || d.lastname,
    'patient',
    pa.firstname || ' ' || pa.lastname,
    'purpose',
    a.appointment_purpose
  ) AS "appointment",
  p.notes AS "notes",
  p.created_at AS "createdAt",
  ARRAY_AGG(
    JSON_BUILD_OBJECT(
      'prescriptionType',
      st.typeName,
      'details',
      st.details
    )
  ) AS "prescriptionDetails"
FROM
  prescriptions p
  INNER JOIN subtable st ON st.prescriptionId = p.id
  INNER JOIN appointments a ON a.id = p.appointment_id
  INNER JOIN doctors d ON d.doctorid = a.doctor_id
  INNER JOIN patients pa ON pa.patientid = a.patient_id
WHERE
  p.id = $1
GROUP BY
  p.id,
  p.appointment_id,
  p.notes,
  p.created_at,
  d.firstname,
  d.lastname,
  pa.firstname,
  pa.lastname,
  a.appointment_purpose;