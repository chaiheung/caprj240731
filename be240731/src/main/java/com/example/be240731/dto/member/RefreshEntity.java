package com.example.be240731.dto.member;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class RefreshEntity {
    private Integer id;
    private String username;
    private String refresh;
    private Timestamp expiration;
}
