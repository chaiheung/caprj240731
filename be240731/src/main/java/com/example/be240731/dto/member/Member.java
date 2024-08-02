package com.example.be240731.dto.member;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Member {
    private Integer id;
    private String username;
    private String nickname;
    private String password;
    private LocalDateTime inserted;
    private Role role;
    private String tokenRole;
    private String imageUrl;
}