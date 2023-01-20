CREATE TABLE words (
    word VARCHAR(5) NOT NULL PRIMARY KEY,
    part_of_speech VARCHAR(15) NOT NULL,
    definitions VARCHAR(255)[] NOT NULL
);

CREATE TABLE user_entry (
    id UUID NOT NULL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    streak INT NOT NULL,
    tries_per_word INT NOT NULL,
    UNIQUE(username)
);

CREATE TABLE leaderboard (
    user_id UUID REFERENCES user_entry(id)
);