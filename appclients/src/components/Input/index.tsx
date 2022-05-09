import { ComponentProps, InputHTMLAttributes } from 'react';

import { Container,InputStyle } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{

};

function Input({...rest}: InputProps) {
  return (
    <Container>
      <InputStyle {...rest}/>
    </Container>
  );
};

export default Input;
