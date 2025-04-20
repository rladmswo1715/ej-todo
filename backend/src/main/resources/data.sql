-- 재시작 시 sample 데이터 중복 삽입 방지하려고 where절 추가
INSERT INTO todo (title, completed, created_at, completed_at, todo_order)
SELECT * FROM (
                  SELECT '운동하기' AS title,
                         false AS completed,
                         NOW() AS created_at,
                         NULL AS completed_at,
                         0 AS todo_order
              ) AS tmp
WHERE NOT EXISTS (
    SELECT 1 FROM todo WHERE title = '운동하기'
);

INSERT INTO todo (title, completed, created_at, completed_at, todo_order)
SELECT * FROM (
                  SELECT '공부하기' AS title,
                         true AS completed,
                         NOW() AS created_at,
                         NOW() AS completed_at,
                         1 AS todo_order
              ) AS tmp
WHERE NOT EXISTS (
    SELECT 1 FROM todo WHERE title = '공부하기'
);

INSERT INTO todo (title, completed, created_at, completed_at, todo_order)
SELECT * FROM (
                  SELECT '과제하기' AS title,
                         false AS completed,
                         NOW() AS created_at,
                         NULL AS completed_at,
                         2 AS todo_order
              ) AS tmp
WHERE NOT EXISTS (
    SELECT 1 FROM todo WHERE title = '과제하기'
);
