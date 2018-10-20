import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import theme from "../../styles/theme";

const Button = props => {
  const Button = styled.button`
    display: block;
    margin: 0 auto;
    color: ${theme.white};
    background-color: ${theme.maroon};
    border: 1px solid ${props => props.theme.white};
    border-radius: 3px;
    font-size: 2rem;
    padding: 1.7rem;
    transition: all 200ms ease-in;
    &:hover {
      background-color: ${theme.black};
      color: ${theme.white};
      transform: scale(1.1);
    }
  `;
  const LinkButton = Button.withComponent(Link);
  const StyledLinkButton = LinkButton.extend`
    text-decoration: none;
    text-align: center;
    width: 50%;
    margin: 2rem auto;
  `;
  return props.link ? (
    <StyledLinkButton to={props.to}>{props.label}</StyledLinkButton>
  ) : (
    <Button onClick={props.clickHandler}>{props.label}</Button>
  );
};

export default Button;
