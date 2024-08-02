package com.example.be240731.controller.member;

import com.example.be240731.dto.member.Member;
import com.example.be240731.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member")
public class MemberController {
    private final MemberService service;

    // MemberSignup
    @PostMapping("/signup")
    public ResponseEntity signup(@RequestBody Member member) {
        service.signup(member);
        return ResponseEntity.ok().build();
    }

    @GetMapping(value = "check", params = "username")
    public ResponseEntity checkUsername(@RequestParam("username") String username) {
        System.out.println("username = " + username);
        Member member = service.getByUsername(username);
        if (member == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(username);
    }

    @GetMapping(value = "check", params = "nickname")
    public ResponseEntity checkNickname(@RequestParam("nickname") String nickname) {
        Member member = service.getByNickname(nickname);
        if (member == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(nickname);
    }
}