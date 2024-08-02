package com.example.be240731.mapper.member;

import com.example.be240731.dto.member.Member;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

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
}