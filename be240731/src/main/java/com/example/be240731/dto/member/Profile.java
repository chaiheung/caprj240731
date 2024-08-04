package com.example.be240731.dto.member;

import lombok.Data;

@Data
public class Profile {
    private Integer id;
    private Integer memberId;
    private String fileName;
    private String uploadPath;
}
