CREATE TABLE main_documents (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  created_at TEXT,
  updated_at TEXT,
  body TEXT
)

INSERT INTO main_documents (name, created_at, body)
VALUES
  ("First document", CURRENT_DATE, "Starter Information")

DELETE FROM main_documents
WHERE id = 2

SELECT * FROM main_documents;