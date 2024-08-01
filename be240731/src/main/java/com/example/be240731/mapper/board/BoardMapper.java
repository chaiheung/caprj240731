package com.example.be240731.mapper.board;

import com.example.be240731.dto.board.BoardDTO;
import org.apache.ibatis.annotations.*;

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

    @Update("""
            UPDATE board
            SET title=#{title},
                content=#{content},
                writer=#{writer}
            WHERE id=#{id}
            """)
    int update(BoardDTO board);

    @Delete("""
            DELETE FROM board
            WHERE id = #{id}
            """)
    int deleteById(Integer id);
}
