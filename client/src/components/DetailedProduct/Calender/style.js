import styled from "styled-components";

export const DatePickerContainer = styled.div`
  display: flex;
  input {
    cursor: pointer;
    background-color: transparent;
    width: 100%;
    height: 65px;
    border: none;
    padding: 40px 20px 13px 20px;
    &:hover {
      border-radius: 8px;
      border: 2px solid ${(props) => props.theme.darkBlack};
    }
  }
  .react-datepicker__day--keyboard-selected,
  .react-datepicker__month-text--keyboard-selected,
  .react-datepicker__quarter-text--keyboard-selected,
  .react-datepicker__year-text--keyboard-selected {
    border-radius: 50%;
    background-color: ${(props) => props.theme.pointColor};
  }
  .react-datepicker__day--selected,
  .react-datepicker__day--range-end,
  .react-datepicker__day--in-selecting-range,
  .react-datepicker__day--in-range,
  .react-datepicker__day--selecting-range-end {
    border-radius: 50%;
    background-color: ${(props) => props.theme.pointColor};
  }
  .react-datepicker__day:hover,
  .react-datepicker__month-text:hover,
  .react-datepicker__quarter-text:hover,
  .react-datepicker__year-text:hover {
    border-radius: 50%;
  }
`;

export const InOutBox = styled.div`
  position: relative;
  width: 50%;
  border-right: ${({ first }) => (first ? "1px" : "0px")} solid #b0b0b0;
  border-bottom: 1px solid #b0b0b0;
`;

export const FixedText = styled.div`
  position: absolute;
  z-index: 1;
  left: 11%;
  top: 23%;
  font-size: 14px;
  font-weight: bold;
`;
