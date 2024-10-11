// Button.js
import styled from 'styled-components';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  $primary?: boolean;
  $secondary?: boolean;
  $fullWidth?: boolean;
}


const StyledButton = styled.button<ButtonProps>`
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 4px;
  transition: all 0.3s ease;
  cursor: pointer;

  ${({ $fullWidth }) => $fullWidth ? 'width: 100%;' : null}

  ${({ $secondary }) => $secondary ? `
    background-color: #333333;
    color: #efefef;
    border: 1px solid #4a4a4a;
    
    &:hover {
      background-color: #000000;
      border-color: #5a5a5a;
      color: #d0d0d0;
    }
  ` : null}

  ${({ $primary }) => $primary ? `
    background-color: #333333;
    color: #efefef;
    border: 1px solid #4a4a4a;
    
    &:hover {
      background-color: #000000;
      border-color: #5a5a5a;
      color: #d0d0d0;
    }` : null}
`;

export default StyledButton;
