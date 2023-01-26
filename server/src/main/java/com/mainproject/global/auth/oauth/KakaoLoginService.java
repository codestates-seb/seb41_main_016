package com.mainproject.global.auth.oauth;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.mainproject.domain.member.dto.MemberDto;
import com.mainproject.domain.member.entity.Member;
import com.mainproject.domain.member.service.MemberService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.Buffer;
import java.util.HashMap;

@Service
@Slf4j
@Transactional
public class KakaoLoginService {
    private final MemberService memberService;

    public KakaoLoginService(MemberService memberService) {
        this.memberService = memberService;
    }

    public KakaoOauth getKakaoAccessToken(String code) {
        KakaoOauth.KakaoOauthBuilder kakaoOauth = new KakaoOauth.KakaoOauthBuilder();
        String accessToken = "";
        String refreshToken = "";
        Integer atkExpire = -1;
        Integer rtkExpire = -1;
        String requestURL = "https://kauth.kakao.com/oauth/token";

        try {
            URL url = new URL(requestURL);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();

            connection.setRequestMethod("POST");
            // setDoOutput: OutputStream으로 POST 데이터를 넘겨준다.
            // POST 요청을 수행하려면 true로 설정 필요
            connection.setDoOutput(true);

            // POST 요청에서 필요한 파라미터를 OutputStream을 통해 전송
            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(connection.getOutputStream()));
            String sb = "grant_type=authorization_code" +
                    "&client_id=fb6a694dd7c7ede22f3102f1b8b17f4f" + // REST_API_KEY
                    "&redirect_uri=http://localhost:8080/auth/kakao/calllback" + // REDIRECT_URI
                    "&code=" + code;
            bw.write(sb);
            bw.flush();

            // Http response 메시지에서 status code를 받아온다.
            // 유효하지 않을 경우 -1 반환
            int responseCode = connection.getResponseCode();
            log.info("Response Code: {}", responseCode);

            BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String s = "";
            StringBuilder builder = new StringBuilder();

            while((s = br.readLine()) != null) builder.append(s);
//            log.info("Response Body: {}", builder);

            JsonElement element = JsonParser.parseString(builder.toString());

            accessToken = element.getAsJsonObject().get("access_token").getAsString();
            refreshToken = element.getAsJsonObject().get("refresh_token").getAsString();
            atkExpire = element.getAsJsonObject().get("expires_in").getAsInt();
            rtkExpire = element.getAsJsonObject().get("refresh_token_expires_in").getAsInt();

            log.info("Access Token: {}", accessToken);
            log.info("Refresh Token: {}", refreshToken);

            br.close();
            bw.close();

            kakaoOauth.accessToken(accessToken)
                    .refreshToken(refreshToken)
                    .ATKExpiresIn(atkExpire)
                    .RTKExpiresIn(rtkExpire);

        } catch (IOException e){
            log.info("Throw Exception IN getKakaoAccessToken: {}", e.getMessage());
        }

        return kakaoOauth.build();
    }

    public HashMap<String, String> getUserInfo(String accessToken) {
        HashMap<String, String> userInfo = new HashMap<>();
        String postURL = "https://kapi.kakao.com/v2/user/me";

        try {
            URL url = new URL(postURL);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Authorization", "Bearer " + accessToken);

//            int responseCode = connection.getResponseCode();
//            log.info("Response Code IN getUserInfo: {}", responseCode);

            BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String s = "";
            StringBuilder builder = new StringBuilder();

            while((s = br.readLine()) != null) builder.append(s);
//            log.info("Response Body IN getUserInfo: {}", builder);

            JsonElement element = JsonParser.parseString(builder.toString());
            JsonObject properties = element.getAsJsonObject().get("properties").getAsJsonObject();
            JsonObject kakaoAccount = element.getAsJsonObject().get("kakao_account").getAsJsonObject();

            String nickname = properties.getAsJsonObject().get("nickname").getAsString();
            String email = kakaoAccount.getAsJsonObject().get("email").getAsString();

            userInfo.put("nickname", nickname);
            userInfo.put("email", email);
        } catch (IOException e) {
            log.info("Throw Exception IN getUserInfo: {}", e.getMessage());
        }

        return userInfo;
    }

    public void kakaoLogoutOnly(String kakaoAccessToken) {
        String requestUri = "https://kapi.kakao.com/v1/user/logout";
        try {
            URL url = new URL(requestUri);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Authorization", "Bearer " + kakaoAccessToken);

            BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String result = "";
            String s = "";
            while((s = br.readLine()) != null) result += s;
            log.info("logout 메소드에서 나온 결과값: {}", result);

            br.close();
        } catch (IOException e) {
            throw new RuntimeException();
        }
    }

    public void socialSignup(MemberDto.OauthPost post) {
        // 매퍼 분리?
        Member member = Member
                .builder()
                .email(post.getEmail())
                .name(post.getName())
                .provider("kakao")
                .build();
        System.out.println("signup으로 넘겨줬을 때 뜨는 email값: " + member.getEmail());

        memberService.createSocialMember(member);
    }

    public void kakaoUnlink(String accessToken) {
        String postURL = "https://kapi.kakao.com/v1/user/unlink";

        try {
            URL url = new URL(postURL);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Authorization", "Bearer " + accessToken);

            int resCode = connection.getResponseCode();
            log.info("response Code: {}", resCode);


        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}
