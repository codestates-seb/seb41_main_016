import React from "react";
import styled from "styled-components";

const DropdownContainer = styled.div`
    border-radius: 4px;
    background-color: white;
    box-shadow: rgb(0 0 0 / 15%) 0px 2px 6px, rgb(0 0 0 / 7%) 0px 0px 0px 1px;
    padding: 16px;
    position: absolute;
    text-align: left;
    width: 100%;
    z-index: 2;
    top: 64px;
`;

const SelectionBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const SelectionText = styled.div`
    flex-grow: 2;
`;

const MinusButton = styled.button`
    display: inline-flex;
    border: 1px solid ${(props) => props.theme.lightGrey};
    border-radius: 50%;
    width: 20px;
    height: 20px;
    align-items: center;
    justify-content: center;
    margin: 15px;
    color: ${(props) => props.theme.lightBlack};
`;

const PlusButton = styled(MinusButton)``;

const CountNumber = styled.div``;

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
                <CountNumber>{adultCount}</CountNumber>
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
                <CountNumber>{childrenCount}</CountNumber>
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
