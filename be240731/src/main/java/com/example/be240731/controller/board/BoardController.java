package com.example.be240731.controller.board;

import com.example.be240731.dto.board.BoardDTO;
import com.example.be240731.service.board.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/board")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService service;

    @PostMapping("create")
    public void create(@RequestBody BoardDTO board) {
        service.create(board);
    }
}
