SELECT
    departmentid AS "id",
    departmentname AS "name"
FROM
    departments
WHERE departmentid = $1;