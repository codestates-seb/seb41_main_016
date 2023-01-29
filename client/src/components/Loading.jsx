import React from "react";
import { PacmanLoader } from "react-spinners/PacmanLoader";
import styled from "styled-components";

export default function Loading() {
  return (
    <PacmanLoader
      color="#36d7b7"
      cssOverride={null}
      loading
      margin={0}
      size={50}
      speedMultiplier={1}
    />
  );
}

const Wrap = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
