package com.example.be240731.service.board;

import com.example.be240731.dto.board.BoardDTO;
import com.example.be240731.mapper.board.BoardMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class BoardService {
    private final BoardMapper mapper;

    public void create(BoardDTO board) {
        mapper.insert(board);
    }

    public boolean validate(BoardDTO board) {
        if (board.getTitle() == null || board.getTitle().isBlank()) {
            return false;
        }
        if (board.getContent() == null || board.getContent().isBlank()) {
            return false;
        }
        if (board.getWriter() == null || board.getWriter().isBlank()) {
            return false;
        }
        return true;
    }

    public List<BoardDTO> list() {
        return mapper.selectAll();
    }

    public BoardDTO get(Integer id) {
        return mapper.selectById(id);
    }

    public void edit(BoardDTO board) {
        mapper.update(board);
    }

    public void remove(Integer id) {
        mapper.deleteById(id);
    }
}