import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  max-width: 1440px;
  min-width: 1024px;
  margin: 0 auto;
  padding: 80px 24px 0 24px;
`;

export default function LayoutContainer({ children }) {
  return <Container>{children}</Container>;
}
