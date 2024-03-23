import styled, { css } from "styled-components";

const SIZES = {
    sm: css`
      --button-font-size: 0.875rem;
      --button-padding: 8px 12px;
      --button-radius: 2px;
    `,
    md: css`
      --button-font-size: 1rem;
      --button-padding: 12px 16px;
      --button-radius: 4px;
    `,
    lg: css`
      --button-font-size: 1.25rem;
      --button-padding: 16px 20px;
      --button-radius: 6px;
    `,
  };
  
  function Button({ disabled, size, children, onClick }) {
    const sizeStyle = SIZES[size];
  
    return (
      <StyledButton disabled={disabled} sizeStyle={sizeStyle} onClick={onClick}>
        {children}
      </StyledButton>
    );
  }
  
  const StyledButton = styled.button`
    ${(p) => p.sizeStyle}
  margin: 0;
  border: none;
  cursor: pointer;
  font-family: "Noto Sans KR", sans-serif;
  font-size: var(--button-font-size, 1rem);
  padding: var(--button-padding, 12px 16px);
  border-radius: var(--button-radius, 8px);
  background: var(--button-bg-color, #0d6efd);
  color: var(--button-color, #ffffff);

  &:active,
  &:hover,
  &:focus {
    background: var(--button-hover-bg-color, #025ce2);
  }

  &:disabled {
    cursor: default;
    opacity: 0.5;
    background: var(--button-bg-color, #025ce2);
  }
`;

export default Button;