package com.example.be240731.service.member;

import com.example.be240731.dto.member.Member;
import com.example.be240731.dto.member.Role;
import com.example.be240731.mapper.member.MemberMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.s3.S3Client;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final S3Client s3Client;
    private final BCryptPasswordEncoder passwordEncoder;
    private final MemberMapper memberMapper;

    // s3 설정
    @Value("${aws.s3.bucket.name}")
    private String bucketName;

    @Value("${image.src.prefix}")
    String srcPrefix;

    //MemberSignup
    public void signup(Member member) {
        member.setPassword(passwordEncoder.encode(member.getPassword()));
        member.setRole(Role.USER);
        memberMapper.signup(member);
    }

    public Member getByUsername(String username) {
        return memberMapper.selectByUsername(username);
    }

    public Member getByNickname(String nickname) {
        return memberMapper.selectByNickname(nickname);
    }
}
