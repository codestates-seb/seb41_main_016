import styled from "styled-components";

export const Wrap = styled.div`
  max-width: 368px;
`;

export const TextBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Text = styled.div`
  font-weight: 700;
  font-size: 18px;
  color: ${(props) =>
    props.date ? props.theme.darkGrey : props.theme.mediumBlack};
  margin-bottom: ${(props) => (props.date ? "6px" : "12px")};
`;

export const HotelBox = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

export const HotelImg = styled.div`
  width: 160px;
  height: 150px;
  background-color: ${(props) => props.theme.lightGrey};
  border-radius: 10px;
`;

export const HotelTextBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
`;

export const HotelText = styled.div`
  font-weight: 700;
  font-size: ${(props) => (props.weight ? "20px" : "18px")};
  color: ${(props) =>
    props.weight ? props.theme.darkBlack : props.theme.mediumBlack};
`;

export const HotelText2 = styled(HotelText)`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  line-height: 23px;
  color: ${(props) => props.theme.lightBlack};
  font-weight: 400;
  font-size: 16px;
  .chek_in {
    margin: 6px 0 2px 0;
  }
`;

export const Review = styled.span`
  display: inline-flex;
  text-decoration: underline !important;
  color: ${(props) => props.theme.pointColor};
  font-weight: 700;
  margin-top: 1rem;
  cursor: pointer;
`;
