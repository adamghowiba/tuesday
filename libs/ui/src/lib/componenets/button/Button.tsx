import React, { FC, ReactNode } from 'react';

export interface ButtonProps {
  buttonType: 'submit';
  children?: ReactNode;
}

const Button: FC<ButtonProps> = (props) => {
  return (
    <>
      <button>Test Button</button>
      <style jsx>{``}</style>
    </>
  );
};

Button.defaultProps = {};

export default Button;
