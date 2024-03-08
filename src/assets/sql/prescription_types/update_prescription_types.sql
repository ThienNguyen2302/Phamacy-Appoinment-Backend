UPDATE
  prescription_types
SET
  prescription_type_name = $2
WHERE
  id = $1;