CREATE TABLE words (
    word VARCHAR(5) NOT NULL PRIMARY KEY,
    part_of_speech VARCHAR(15) NOT NULL,
    definitions VARCHAR(300)[] NOT NULL
);

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    _id UUID NOT NULL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    played_words INT NOT NULL,
    highest_streak INT NOT NULL,
    avg_no_of_guesses INT NOT NULL,
    UNIQUE(username)
);