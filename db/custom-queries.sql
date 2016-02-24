-- get a masseuist with their massages

SELECT masseuists.name as masseuist_name, array_agg(massages.name) as massage_name FROM
masseuists LEFT JOIN proficiencies on proficiencies.masseuist_id = masseuists.id
           LEFT JOIN massages on proficiencies.massage_id = massages.id
WHERE masseuists.id = 1
GROUP BY masseuists.name;
