import styled from "styled-components";

export const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const ModalBackdrop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  z-index: 9999;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  position: fixed;
  animation: modalBgShow 1s;
  @keyframes modalBgShow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const ModalView = styled.div`
  position: relative;
  min-width: 40%;
  min-height: 80%;
  background-color: ${(props) => props.theme.white};
  display: flex;
  padding: 34px 56px 34px 56px;
  border-radius: 10px;
  flex-direction: column;
  justify-content: space-between;
`;

export const HotelBox = styled.div`
  display: flex;
  margin-top: 3rem;
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
  margin-left: 1rem;
`;

export const HotelText = styled.div`
  font-weight: 700;
  font-size: ${(props) => (props.weight ? "20px" : "18px")};
  color: ${(props) =>
    props.weight ? props.theme.darkBlack : props.theme.mediumBlack};
  padding: ${(props) => (props.weight ? "16px 0 " : "50px 0 8px 0")};
`;

export const HotelText2 = styled.span`
  font-weight: 400;
  font-size: 16px;
  color: ${(props) => props.theme.lightBlack};
`;

export const Title = styled.div`
  font-weight: 700;
  font-size: 32px;
  margin: 0 auto;
`;

export const CloseModal = styled.div`
  position: absolute;
  font-weight: 700;
  font-size: 32px;
  right: 2rem;
  top: 1rem;
  cursor: pointer;
`;

export const StarBox = styled.div`
  padding: 2rem 0 1rem 0;
  margin: 0 auto;
  & svg {
    color: gray;
    cursor: pointer;
    margin: 0.5rem;
  }

  :hover svg {
    color: #fbbc05;
  }

  & svg:hover ~ svg {
    color: gray;
  }

  .yellowStar {
    color: #fbbc05;
  }
`;

export const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  label {
    margin-bottom: 5px;
    font-weight: 700;
    font-size: 18px;
  }
`;

export const Text = styled.textarea`
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.lightGrey};
  padding: 1rem;
`;

export const BtnBox = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

export const Btn = styled.button`
  border-radius: 10px;
  width: 50%;
  border: none;
  background-color: transparent;
  font-weight: 700;
  font-size: 18px;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.pointColor};
    color: white;
  }
`;

export const Btn2 = styled(Btn)`
  color: ${(props) => props.theme.mediumGrey};
`;
