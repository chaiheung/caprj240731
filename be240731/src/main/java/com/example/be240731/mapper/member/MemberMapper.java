package com.example.be240731.mapper.member;

import com.example.be240731.dto.member.Member;
import org.apache.ibatis.annotations.*;

@Mapper
public interface MemberMapper {

    // MemberSignup
    @Insert("""
            INSERT INTO member(username, nickname, password)
            VALUES (#{username}, #{nickname}, #{password})
            """
    )
    int signup(Member member);

    @Select("""
            SELECT *
            FROM member
            WHERE username = #{username}
            """)
    Member selectByUsername(String username);

    @Select("""
            SELECT *
            FROM member
            WHERE nickname = #{nickname}
            """)
    Member selectByNickname(String nickname);

    // MemberEdit
    @Select("""
            SELECT *
            FROM member
            WHERE id = #{id}
            """)
    Member selectByMemberId(Integer id);

    @Update("""
                UPDATE member
                SET nickname = #{nickname},
                    password = #{password}
                WHERE id = #{id}
            """)
    int update(Member member);

    // MemberDelete
    @Delete("""
            DELETE FROM member
            WHERE id = #{id}
            """)
    int deleteById(Integer id);
}