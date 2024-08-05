use caprj240731;
DROP TABLE board;
DROP TABLE board_file;
CREATE TABLE board
(
    id       INT PRIMARY KEY AUTO_INCREMENT,
    title    VARCHAR(100)  NOT NULL,
    content  VARCHAR(1000) NOT NULL,
    writer   VARCHAR(100)  NOT NULL,
    inserted DATETIME      NOT NULL DEFAULT NOW()
);

ALTER TABLE board
    MODIFY COLUMN member_id INT NOT NULL;
DESC board;
SELECT *
FROM board
ORDER BY id DESC;


CREATE TABLE board_file
(
    board_id INT          NOT NULL REFERENCES board (id),
    name     VARCHAR(500) NOT NULL,
    PRIMARY KEY (board_id, name)
);