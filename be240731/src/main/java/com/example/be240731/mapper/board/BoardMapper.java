package com.example.be240731.mapper.board;

import com.example.be240731.dto.board.BoardDTO;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface BoardMapper {

    @Insert("""
            INSERT INTO board (title, content, writer)
            VALUES (#{title}, #{content}, #{writer})
            """)
    int insert(BoardDTO board);

    @Select("""
            SELECT id, title, writer
            FROM board
            ORDER BY id DESC
            """)
    List<BoardDTO> selectAll();

    @Select("""
            SELECT *
            FROM board
            WHERE id = #{id}
            """)
    BoardDTO selectById(Integer id);
}
