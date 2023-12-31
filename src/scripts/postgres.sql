DROP TABLE IF EXISTS HERO;

CREATE TABLE IF NOT EXISTS HERO (
    ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
    NAME TEXT NOT NULL,
    POWER TEXT NOT NULL
);

INSERT INTO HERO (NAME, POWER)
VALUES ('Superman', 'flying'),
       ('Batman', 'money'),
       ('Spiderman', 'web-slinging');

SELECT * FROM HERO;
SELECT name FROM HERO WHERE NAME = 'Superman';

UPDATE HERO
SET POWER = 'scaling'
WHERE NAME = 'Spiderman';

DELETE FROM HERO WHERE NAME = 'Batman';