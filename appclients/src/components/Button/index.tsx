import { Container } from './styles';
import {ButtonHTMLAttributes} from 'react'

interface ButtonProps extends ButtonHTMLAttributes <HTMLButtonElement> {
  title: string;
}

function Button({title,...rest}: ButtonProps) {
  return (
    <Container {...rest}>
      {title}
    </Container>
  );
};

export default Button;
