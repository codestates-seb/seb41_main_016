import React from "react";
import { useCallback } from "react";
import { DropdownContainer, SelectionBox, SelectionText } from "./style";

export default function RoomSelection({
  modalOpened,
  onToggle,
  onOptionClick,
}) {
  const handleOptionClick = useCallback(
    (evt) => {
      if (modalOpened) {
        // 값 넘겨주기
        onOptionClick(evt.target.value);
        // 토글 바꾸기
        onToggle();
      }
    },
    [onToggle, onOptionClick, modalOpened]
  );

  return (
    <DropdownContainer>
      <SelectionBox>
        <SelectionText onClick={handleOptionClick} defaultValue="1 King Bed" />
        <SelectionText onClick={handleOptionClick} defaultValue="2 Twin Beds" />
      </SelectionBox>
    </DropdownContainer>
  );
}
