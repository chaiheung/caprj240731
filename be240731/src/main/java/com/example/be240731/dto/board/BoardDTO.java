package com.example.be240731.dto.board;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BoardDTO {
    private Integer id;
    private String title;
    private String content;
    private String writer;
    private LocalDateTime inserted;
}
