--Delete FROM "main"."test"
--SELECT *  FROM "main"."test" LIMIT 1000;
--CREATE id INTEGER KEY AUTOINCREMENT On "main"."test" (id)

-- DROP TABLE "main"."DICTIONARY";
-- CREATE TABLE DICTIONARY(
--   ID INTEGER PRIMARY KEY AUTOINCREMENT,
--   KEY           VARCHAR(50)     NOT NULL,
--   LEN           INT NOT NULL,
--   CONTENT       VARCHAR(50)     NOT NULL,
--   TYPE          VARCHAR(50)   NOT NULL,
--   REX           INT   NOT NULL,
--   CATEGORY_ID   INT   NOT NULL
-- );

-- DROP TABLE "main"."CATEGORIES";
-- CREATE TABLE CATEGORIES(
--   ID INTEGER PRIMARY KEY AUTOINCREMENT,
--   NAME    VARCHAR(50)     NOT NULL,
--   INORDER INT
-- );

-- INSERT INTO "main"."CATEGORIES" (NAME,INORDER)  VALUES ("Khang Hi",1);
-- Select * from "main"."CATEGORIES";
--Delete FROM "main"."CATEGORIES" WHERE ID=4
--INSERT INTO DICTIONARY (KEY,LEN,CONTENT,TYPE,REX,CATEGORY_ID) VALUES ('from',4,'từ','Danh từ',0,1);
--Select * from "main"."DICTIONARY";
-- UPDATE COMPANY SET ADDRESS = 'Texas' WHERE ID = 6;


--DROP TABLE "main"."DICTIONARY_MATCH";
-- CREATE TABLE DICTIONARY_MATCH(
--   ID INTEGER PRIMARY KEY AUTOINCREMENT,
--   KEY           VARCHAR(50)     NOT NULL,
--   LEN           INT NOT NULL,
--   ALIAS         VARCHAR(50)     NOT NULL,
--   CONTENT       VARCHAR(50)     NOT NULL,
--   CATEGORY_ID   INT   NOT NULL
-- );
