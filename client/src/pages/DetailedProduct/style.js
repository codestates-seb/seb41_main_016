import styled from "styled-components";

export const TitleBox = styled.div`
  padding-top: 24px;
  display: flex;
  flex-direction: column;
`;

export const HotelName = styled.span`
  font-size: 32px;
  line-height: 30px;
  font-weight: 700;
`;

export const ShortInfoBox = styled.div`
  margin-top: 20px;
  display: flex;
`;

export const ShortInfo = styled.span`
  font-size: 20px;
  font-weight: 700;
  align-items: center;
  display: inline-flex;
  margin-right: 15px;
  svg {
    color: #fbbc05;
    margin-right: 3px;
  }
`;

export const ReviewNumber = styled(ShortInfo)`
  text-decoration: underline !important;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
`;

export const PictureContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const MainContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 40px;
  border-bottom: 1px solid ${(props) => props.theme.lightGrey};
  padding-bottom: 48px;
  margin-bottom: 15px;
`;

export const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
`;

export const InfoTitle = styled.div`
  font-size: 24px;
  font-weight: 700;
  line-height: 20px;
  margin-bottom: 15px;
`;

export const InfoText = styled.div`
  line-height: 23px;
  margin: 0 0 24px 0;
  font-size: 14px;
  font-weight: 400;
  color: rgb(113, 113, 113);
`;

export const RoomActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 50px;
  border: 1px solid rgb(221, 221, 221);
  border-radius: 12px;
  padding: 24px;
  box-shadow: rgb(0 0 0 / 12%) 0px 6px 16px;
  width: 40%;
`;

export const DailyPrice = styled.div`
  margin: 14px 0 24px 0;
  font-weight: 700;
  font-size: 20px;
`;

export const ReservationContainer = styled.div`
  border: 1px solid #b0b0b0;
  border-radius: 8px;
  margin-bottom: 24px;
`;

export const PersonSelection = styled.div`
  display: flex;
  flex-direction: column;
  background-color: transparent;
  border-bottom: 1px solid #b0b0b0;
  height: 65px;
  position: relative;
  &:hover {
    cursor: pointer;
    border-radius: 8px;
    border: 2px solid ${(props) => props.theme.darkBlack};
  }
`;

export const RoomChoice = styled.div`
  z-index: 1;
  display: flex;
  flex-direction: column;
  background-color: transparent;
  height: 65px;
  position: relative;
  &:hover {
    cursor: pointer;
    border-radius: 8px;
    border: 2px solid ${(props) => props.theme.darkBlack};
  }
`;

export const FixedText = styled.div`
  position: relative;
  z-index: 1;
  left: 5%;
  top: 25%;
  font-size: 14px;
  font-weight: bold;
`;

export const DependentText = styled.div`
  position: relative;
  top: 35%;
  font-size: 12px;
  font-weight: lighter;
  color: rgb(113, 113, 113);
`;

export const DropdownMark = styled.div`
  position: absolute;
  right: 10%;
  top: 27%;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    font-size: 20px;
  }
`;

export const ConfirmContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const ConfirmButton = styled.button`
  background-color: ${(props) => props.theme.pointColor};
  color: ${(props) => props.theme.white};
  padding: 20px;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 24px;
  &:hover {
    background-color: #008080;
  }
`;

export const ConfirmAlert = styled.div`
  color: ${(props) => props.theme.mediumGrey};
  text-align: center;
  font-size: 14px;
  padding-bottom: 24px;
  border-bottom: 1px solid #b0b0b0;
`;

export const TotalBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const TotalText = styled.div`
  margin-top: 40px;
  font-weight: 700;
  font-size: 20px;
`;

export const TotalPrice = styled(TotalText)``;

export const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ShortInfoBox2 = styled(ShortInfoBox)`
  margin-bottom: 30px;
`;

export const ShortInfo2 = styled(ShortInfo)`
  font-size: 24px;
`;

export const ReviewNumber2 = styled(ReviewNumber)`
  text-decoration: none !important;
`;

export const PaginationBox = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

export const ReviewCardBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-gap: 20px;
`;
