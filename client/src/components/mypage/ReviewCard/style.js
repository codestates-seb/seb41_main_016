import styled from "styled-components";

export const Wrap = styled.div`
  max-width: 368px;
  display: flex;
  justify-content: space-between;
`;

export const ReviewlImg = styled.div`
  width: 160px;
  height: 150px;
  background-color: ${(props) => props.theme.lightGrey};
  border-radius: 10px;
`;

export const HotelTextBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 176px;
  margin-left: 1rem;
`;

export const DateText = styled.span`
  padding: 4px 0 8px 0;
  font-weight: 700;
  font-size: 18px;
  color: ${(props) => props.theme.darkGrey};
`;

export const TitleText = styled(DateText)`
  padding-bottom: 3px;
  color: ${(props) => props.theme.mediumBlack};
`;

export const Described = styled.div`
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-weight: 400;
  margin-bottom: 1rem;
`;

export const BtnBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Btn = styled.button`
  padding: 4px 16px;
  border: 1px solid ${(props) => props.theme.lightGrey};
  border-radius: 8px;
  background: ${(props) => props.theme.white};
  cursor: pointer;
`;

export const StarBox = styled.div`
  padding: 4px 0 8px 0;
  & svg {
    color: gray;
  }

  & svg:hover ~ svg {
    color: gray;
  }

  .yellowStar {
    color: #fbbc05;
  }
`;
