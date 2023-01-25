import React, { useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
    Btn,
    NameInput,
    ProfileBox,
    ProfileImgBox,
    ProfileText,
    UserInfo,
    UserInfo2,
    WishTextBox,
    Wrap,
} from "./style";

export default function Profile({ email, name, image }) {
    const [modify, setModify] = useState(false);

    return (
        <ProfileBox>
            <Wrap>
                <ProfileImgBox />
                <ProfileText
                    onClick={() => setModify((prev) => !prev)}
                    modify={modify}
                >
                    프로필 수정하기
                </ProfileText>
            </Wrap>
            {modify ? (
                <>
                    <Btn>사진 업데이트 하기</Btn>
                    <UserInfo>
                        <label htmlFor="name" className="modify_name">
                            이름
                        </label>
                        <NameInput type="text" id="name" value={name} />
                    </UserInfo>
                    <WishTextBox modify={modify}>
                        <span
                            className="cancellation"
                            onClick={() => setModify((prev) => !prev)}
                        >
                            취소
                        </span>
                        <span>저장</span>
                    </WishTextBox>
                </>
            ) : (
                <>
                    <UserInfo>
                        <span className="name">{name}</span>
                        <span className="sign">회원가입 : 2023</span>
                        <span className="email">{email}</span>
                    </UserInfo>
                    <UserInfo2>
                        <span className="info">소개글</span>
                        <span className="info_text">
                            안녕하세요.
                            <br />
                            저는 {name} 입니다.
                        </span>
                    </UserInfo2>
                    <Link to="/wishlists">
                        <WishTextBox>
                            <span>위시리스트 가기</span>
                            <FaAngleRight />
                        </WishTextBox>
                    </Link>
                </>
            )}
        </ProfileBox>
    );
}
