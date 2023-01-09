import React from "react";
import styled from "styled-components";

const DropdownContainer = styled.div`
    border-radius: 4px;
    background-color: grey;
    box-shadow: rgb(0 0 0 / 15%) 0px 2px 6px, rgb(0 0 0 / 7%) 0px 0px 0px 1px;
    margin-bottom: 16px;
    padding: 16px;
    position: absolute;
    text-align: left;
    width: 100%;
    z-index: 3;
    right: 0px;
    top: 150px;
`;

const SelectionBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const SelectionText = styled.div`
    flex-grow: 2;
`;

export default function RoomSelection() {
    <DropdownContainer>
        <SelectionBox>
            <SelectionText>1 King Bed</SelectionText>
            <SelectionText>2 Twin Beds</SelectionText>
        </SelectionBox>
    </DropdownContainer>;
}
