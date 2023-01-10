import React from "react";
import styled from "styled-components";
import { CgProfile } from "react-icons/cg";

const ReviewContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    margin-bottom: 40px;
`;

const CardContainer = styled.div`
    width: 80%;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
`;

const ProfileContainer = styled.div`
    display: flex;
    margin-bottom: 12px;
`;

const ProfileImg = styled.div`
    justify-content: flex-start;
    svg {
        width: 60px;
        height: 60px;
    }
`;

const ProfileInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin-left: 10px;
`;

const UserName = styled.div`
    font-weight: bold;
`;

const RegDate = styled.div`
    font-size: 14px;
    color: ${(props) => props.theme.mediumGrey};
`;

const ReviewContent = styled.div`
    color: ${(props) => props.theme.darkGrey};
    line-height: 24px;
`;

const MoreContent = styled.div`
    margin-top: 12px;
    text-decoration: underline;
    cursor: pointer;
`;

export default function ReviewCard() {
    return (
        <ReviewContainer>
            <CardContainer>
                <ProfileContainer>
                    <ProfileImg>
                        <CgProfile />
                    </ProfileImg>
                    <ProfileInfo>
                        <UserName>Dabin</UserName>
                        <RegDate>2023년 1월</RegDate>
                    </ProfileInfo>
                </ProfileContainer>
                <ReviewContent>
                    너무너무 좋은 숙소 였습니다. 침대가 너무 폭신해서 침대
                    안으로 빠져들가는 느낌을 단박에 받았어요. 못 나오는 줄 알고
                    지레 겁을 먹었던 숙소 였습니다. 다음에 기회가 된다면 재방문
                    의사 당근 빠대루 있습니다!
                </ReviewContent>
            </CardContainer>
            <CardContainer>
                <ProfileContainer>
                    <ProfileImg>
                        <CgProfile />
                    </ProfileImg>
                    <ProfileInfo>
                        <UserName>Dabin</UserName>
                        <RegDate>2023년 1월</RegDate>
                    </ProfileInfo>
                </ProfileContainer>
                <ReviewContent>
                    너무너무 좋은 숙소 였습니다. 침대가 너무 폭신해서 침대
                    안으로 빠져들가는 느낌을 단박에 받았어요. 못 나오는 줄 알고
                    지레 겁을 먹었던 숙소 였습니다. 다음에 기회가 된다면 재방문
                    의사 당근 빠대루 있습니다!
                </ReviewContent>
            </CardContainer>
            <CardContainer>
                <ProfileContainer>
                    <ProfileImg>
                        <CgProfile />
                    </ProfileImg>
                    <ProfileInfo>
                        <UserName>Dabin</UserName>
                        <RegDate>2023년 1월</RegDate>
                    </ProfileInfo>
                </ProfileContainer>
                <ReviewContent>
                    너무너무 좋은 숙소 였습니다. 침대가 너무 폭신해서 침대
                    안으로 빠져들가는 느낌을 단박에 받았어요. 못 나오는 줄 알고
                    지레 겁을 먹었던 숙소 였습니다. 다음에 기회가 된다면 재방문
                    의사 당근 빠대루 있습니다!
                </ReviewContent>
            </CardContainer>
            <CardContainer>
                <ProfileContainer>
                    <ProfileImg>
                        <CgProfile />
                    </ProfileImg>
                    <ProfileInfo>
                        <UserName>Dabin</UserName>
                        <RegDate>2023년 1월</RegDate>
                    </ProfileInfo>
                </ProfileContainer>
                <ReviewContent>
                    너무너무 좋은 숙소 였습니다. 침대가 너무 폭신해서 침대
                    안으로 빠져들가는 느낌을 단박에 받았어요. 못 나오는 줄 알고
                    지레 겁을 먹었던 숙소 였습니다. 다음에 기회가 된다면 재방문
                    의사 당근 빠대루 ...
                </ReviewContent>
                <MoreContent>더보기</MoreContent>
            </CardContainer>
        </ReviewContainer>
    );
}
