use caprj240731;

CREATE TABLE member
(
    id       INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE,
    nickname VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    inserted DATETIME     NOT NULL DEFAULT NOW()
);

CREATE TABLE refresh_token
(
    id         INT PRIMARY KEY AUTO_INCREMENT,
    username   VARCHAR(255) NOT NULL,
    refresh    VARCHAR(512) NOT NULL UNIQUE,
    expiration TIMESTAMP    NOT NULL
);

CREATE TABLE profile
(
    id          INT AUTO_INCREMENT PRIMARY KEY,
    member_id   INT          NOT NULL,
    file_name   VARCHAR(255) NOT NULL,
    upload_path VARCHAR(255) NOT NULL,
    FOREIGN KEY (member_id) REFERENCES member (id)
);
