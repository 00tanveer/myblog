import React from "react";
import styled from "styled-components";

const Underline = props => {
  const StyledUnderLine = styled.div`
    height: 2px;
    width: 0px;
    background-color: white;
    transition: width 0.3s ease-in;
  `;

  return <StyledUnderLine />;
};

export default Underline;
