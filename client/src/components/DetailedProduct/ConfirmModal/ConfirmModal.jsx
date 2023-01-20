import React from "react";
import {
  ButtonBox,
  CancelButton,
  ConfirmButton,
  ConfirmText,
  ModalContainer,
} from "./style";

export default function ConfirmModal({ handleConfirm }) {
  return (
    <ModalContainer>
      <ConfirmText>예약하시겠습니까?</ConfirmText>
      <ButtonBox>
        <ConfirmButton>확인</ConfirmButton>
        <CancelButton onClick={handleConfirm}>취소</CancelButton>
      </ButtonBox>
    </ModalContainer>
  );
}
