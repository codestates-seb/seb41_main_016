import styled from "styled-components";

export const ReviewContainer = styled.div`
  width: 100%;
  display: flex;
`;

export const CardContainer = styled.div`
  width: 80%;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
`;

export const ProfileContainer = styled.div`
  display: flex;
  margin-bottom: 12px;
`;

export const ProfileImg = styled.div`
  justify-content: flex-start;
  svg {
    width: 60px;
    height: 60px;
  }
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-left: 10px;
`;

export const UserName = styled.div`
  font-weight: bold;
`;

export const RegDate = styled.div`
  font-size: 14px;
  color: ${(props) => props.theme.mediumGrey};
`;

export const ReviewContent = styled.div`
  color: ${(props) => props.theme.darkGrey};
  line-height: 24px;
  text-overflow: ellipsis; //말 줄임표 생략기호
  overflow: hidden; //넘어간 부분(글자) 안보여주기
  white-space: nowrap; //여러줄 안보이게 하기
`;

export const MoreContent = styled.div`
  text-decoration: underline !important;
  margin-top: 15px;
  cursor: pointer;
`;
