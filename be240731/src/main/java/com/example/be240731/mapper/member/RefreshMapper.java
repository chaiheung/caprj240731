package com.example.be240731.mapper.member;

import com.example.be240731.dto.member.RefreshEntity;
import org.apache.ibatis.annotations.*;

@Mapper
public interface RefreshMapper {

    // Refresh 토큰 삽입
    @Insert("""
            INSERT INTO refresh_token (username, refresh, expiration)
            VALUES (#{username}, #{refresh}, #{expiration})
            """)
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insertbyRefresh(RefreshEntity refreshEntity);

    // Refresh 토큰 존재 여부 체크
    @Select("""
            SELECT COUNT(*) > 0
            FROM refresh_token
            WHERE refresh = #{refresh}
            """)
    Boolean existsByRefresh(@Param("refresh") String refresh);

    // Refresh 토큰 삭제
    @Delete("""
            DELETE FROM refresh_token
            WHERE refresh = #{refresh}
            """)
    int deleteByRefresh(@Param("refresh") String refresh);

    // 사용자 이름으로 Refresh 토큰 삭제
    @Delete("""
            DELETE FROM refresh_token
            WHERE username = #{username}
            """)
    int deleteByUsername(@Param("username") String username);


}