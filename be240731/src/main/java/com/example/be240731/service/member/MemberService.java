package com.example.be240731.service.member;

import com.example.be240731.dto.board.Board;
import com.example.be240731.dto.member.Member;
import com.example.be240731.dto.member.Profile;
import com.example.be240731.dto.member.Role;
import com.example.be240731.mapper.board.BoardMapper;
import com.example.be240731.mapper.member.MemberMapper;
import com.example.be240731.mapper.member.ProfileMapper;
import com.example.be240731.mapper.member.RefreshMapper;
import com.example.be240731.service.board.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.ObjectCannedACL;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final S3Client s3Client;
    private final BCryptPasswordEncoder passwordEncoder;
    private final MemberMapper memberMapper;
    private final RefreshMapper refreshMapper;
    private final ProfileMapper profileMapper;
    private final BoardService boardService;
    private final BoardMapper boardMapper;

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

    // MemberEdit
    public Member getById(Integer id) {
        Member member = memberMapper.selectByMemberId(id);
        if (member == null) {
            return null;
        }
        Profile profile = profileMapper.selectProfileByMemberId(id);
        if (profile != null) {
            String imageUrl = srcPrefix + profile.getUploadPath();
            member.setImageUrl(imageUrl);
        }
        return member;
    }

    public boolean update(Integer id, Member member) {
        member.setId(id);
        // 비밀번호가 변경된 경우만 암호화
        if (member.getPassword() != null && !member.getPassword().isEmpty()) {
            member.setPassword(passwordEncoder.encode(member.getPassword()));
        }
        return memberMapper.update(member) > 0;
    }

    // MemberPage
    @Transactional
    public void saveProfileImage(Integer memberId, MultipartFile file) throws IOException {
        String fileName = memberId + "_" + file.getOriginalFilename();
        String key = "profile/" + memberId + "/" + fileName;
        PutObjectRequest objectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key("caprj240731/" + key)
                .acl(ObjectCannedACL.PUBLIC_READ)
                .build();

        s3Client.putObject(objectRequest, RequestBody.fromInputStream(file.getInputStream(), file.getSize()));

        Profile profile = new Profile();
        profile.setMemberId(memberId);
        profile.setFileName(fileName);
        profile.setUploadPath(key);

        Profile profile1 = profileMapper.selectProfileByMemberId(memberId);
        if (profile1 != null) {
            profileMapper.deleteProfileByMemberId(memberId);
        }

        profileMapper.insertProfile(profile);
    }

    public Profile getProfileByMemberId(Integer memberId) {
        return profileMapper.selectProfileByMemberId(memberId);
    }

    public void deleteProfileByMemberId(Integer memberId) {
        Profile profile = profileMapper.selectProfileByMemberId(memberId);
        if (profile != null) {
            deleteImageFromS3(profile.getUploadPath());
            profileMapper.deleteProfileByMemberId(memberId);
        }
    }

    private void deleteImageFromS3(String uploadPath) {
        try {
            DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                    .bucket(bucketName)
                    .key("caprj240731/" + uploadPath)
                    .build();
            s3Client.deleteObject(deleteObjectRequest);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public String getSrcPrefix() {
        return srcPrefix;
    }

    // MemberDelete
    public void delete(Integer id) {
        //회원이 쓴 게시물 조회
        List<Board> boardList = boardMapper.selectByMemberId(id);

        // 각 게시물 지우기
        boardList.forEach(board -> boardService.delete(board.getId()));

    }

    public boolean validatePassword(Integer id, String password) {
        Member dbMember = memberMapper.selectByMemberId(id);
        if (dbMember == null) {
            return false;
        }
        return passwordEncoder.matches(password, dbMember.getPassword());
    }
}
