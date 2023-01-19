import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import { DatePickerContainer, FixedText, InOutBox } from "./style";

export default function Calender({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}) {
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
