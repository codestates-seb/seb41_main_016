import styled from "styled-components";

export const ReservationBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 77px;
  height: 564px;

  .reservation {
    margin: 0.5rem 0;
    font-weight: 700;
    font-size: 18px;
  }
`;

export const Line = styled.div`
  margin-bottom: 1rem;
  height: 1px;
  background-color: ${(props) => props.theme.lightGrey};
`;

export const ReviewBox = styled(ReservationBox)`
  height: 246px;
  margin-bottom: 0px;
`;

export const ReservationWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-gap: 20px;
`;
