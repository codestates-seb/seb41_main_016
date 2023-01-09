import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import styled from "styled-components";

const DatePickerContainer = styled.div`
    display: flex;
    input {
        background-color: transparent;
        width: 100%;
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

const InOutBox = styled.div`
    position: relative;
    width: 50%;
    border-right: ${({ first }) => (first ? "1px" : "0px")} solid #b0b0b0;
    border-bottom: 1px solid #b0b0b0;
`;

const FixedText = styled.div`
    position: absolute;
    z-index: 1;
    left: 10%;
    top: 20%;
    font-size: 14px;
    font-weight: bold;
`;

export default function Calender() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    return (
        <>
            <DatePickerContainer>
                <InOutBox first>
                    <FixedText>체크인</FixedText>
                    <DatePicker
                        dateFormat={"yyyy.MM.dd"}
                        locale={ko}
                        minDate={new Date()}
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        monthsShown={2}
                        withPortal
                        placeholderText="날짜 선택"
                    />
                </InOutBox>
                <InOutBox>
                    <FixedText>체크아웃</FixedText>
                    <DatePicker
                        dateFormat={"yyyy.MM.dd"}
                        locale={ko}
                        minDate={startDate}
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        monthsShown={2}
                        withPortal
                        placeholderText="날짜 선택"
                    />
                </InOutBox>
            </DatePickerContainer>
        </>
    );
}
