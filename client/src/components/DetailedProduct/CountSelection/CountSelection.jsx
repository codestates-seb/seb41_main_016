import React from "react";
import {
  DropdownContainer,
  MinusButton,
  PlusButton,
  SelectionBox,
  SelectionText,
} from "./style";

export default function CountSelection({
  adultCount,
  addAdultCount,
  removeAdultCount,
  addChildrenCount,
  childrenCount,
  removeChildrenCount,
}) {
  return (
    <DropdownContainer>
      <SelectionBox>
        <SelectionText>성인</SelectionText>
        <MinusButton onClick={removeAdultCount}>-</MinusButton>
        <div>{adultCount}</div>
        <PlusButton
          onClick={addAdultCount}
          disabled={adultCount > 1 ? "disabled" : null}
        >
          +
        </PlusButton>
      </SelectionBox>
      <SelectionBox>
        <SelectionText>아동</SelectionText>
        <MinusButton onClick={removeChildrenCount}>-</MinusButton>
        <div>{childrenCount}</div>
        <PlusButton
          onClick={addChildrenCount}
          disabled={childrenCount > 1 ? "disabled" : null}
        >
          +
        </PlusButton>
      </SelectionBox>
    </DropdownContainer>
  );
}
