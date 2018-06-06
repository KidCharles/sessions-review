CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(100),
    password VARCHAR(100)
)

INSERT INTO users
(username, password)
VALUES
('stick', 'sour')