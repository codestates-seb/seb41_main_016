import React, { useState } from "react";
import styled from "styled-components";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProfileBox = styled.div`
  width: 280px;
  height: 880px;
  border: 1px solid ${(props) => props.theme.lightGrey};
  border-radius: 8px;
  display: flex;
  flex-direction: column;

  padding: 2.5rem 1rem;
  color: ${(props) => props.theme.mediumBlack};
  margin-bottom: 8rem;
`;

const ProfileText = styled.span`
  margin: 1.5rem 0 4rem 0;
  font-weight: 700;
  text-decoration-line: underline;
  color: ${(props) =>
    props.modify ? props.theme.lightGrey : props.theme.mediumBlack};
  pointer-events: ${(props) => (props.modify ? "none" : null)};
  cursor: pointer;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .profile {
    margin: 1.5rem 0 4rem 0;
    font-weight: 700;
    text-decoration-line: underline;
  }
`;

const ProfileImgBox = styled.input`
  /* display: none; */
  border-radius: 50%;
  background-color: ${(props) => props.theme.lightGrey};
  height: 180px;
  width: 180px;
  margin: 0 auto;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 33px;
  line-height: 26px;

  span {
    margin: 4px;
  }
  .name {
    font-size: 32px;
    font-weight: 700;
  }

  .sign {
    color: ${(props) => props.theme.darkGrey};

    font-size: 18px;
    font-weight: 400;
  }
  .email {
    color: ${(props) => props.theme.lightBlack};
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 40px;
  }
  .info {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 10px;
  }
  .info_text {
    font-size: 18px;
    font-weight: 400;
    line-height: 26px;
  }

  /* .modify_img {
    font-weight: 700;
    text-decoration-line: underline;
    font-size: 18px;
    margin-bottom: 22px;
    border: none;
    cursor: pointer;
    background-color: transparent;
  } */
  .modify_name {
    font-weight: 700;
    font-size: 18px;
    margin-bottom: 8px;
  }
`;

const UserInfo2 = styled(UserInfo)`
  margin-bottom: ${(props) => (props.modify ? "240px" : "250px")};
`;

const NameInput = styled.input`
  border: 1px solid ${(props) => props.theme.lightGrey};
  border-radius: 10px;
  width: 169px;
  padding: 10px 10px;
  margin-bottom: 20px;
`;

const InfoInput = styled.textarea`
  border: 1px solid ${(props) => props.theme.lightGrey};
  border-radius: 10px;
  width: 169px;
  height: 66px;
`;

const WishTextBox = styled.div`
  display: flex;
  /* margin: 0 33px; */
  margin: ${(props) => (props.modify ? "0px" : "0 33px")};
  color: ${(props) =>
    props.modify ? props.theme.mediumBlack : props.theme.pointColor};
  font-size: 18px;
  font-weight: 700;
  align-items: center;

  span {
    margin-right: 1rem;
    margin: 0 auto;
    cursor: pointer;
  }
  svg {
    font-size: 30px;
  }

  .cancellation {
    color: ${(props) => props.theme.mediumGrey};
  }
`;

const Btn = styled.button`
  font-weight: 700;
  text-decoration-line: underline;
  font-size: 18px;
  margin-bottom: 22px;
  border: none;
  cursor: pointer;
  background-color: transparent;
`;

export default function Profile() {
  const [modify, setModify] = useState(false);

  return (
    <ProfileBox>
      <Wrap>
        <ProfileImgBox />
        <ProfileText onClick={() => setModify((prev) => !prev)} modify={modify}>
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
            <NameInput type="text" id="name" />
          </UserInfo>

          <UserInfo2>
            <span className="info">소개</span>
            <InfoInput type="text" />
          </UserInfo2>
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
            <span className="name">Dabin</span>
            <span className="sign">회원가입 : 2023</span>
            <span className="email">dabin@gmail.com</span>
          </UserInfo>
          <UserInfo2>
            <span className="info">소개글</span>
            <span className="info_text">
              안녕하세요.
              <br />
              저는 Dabin 입니다.
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
