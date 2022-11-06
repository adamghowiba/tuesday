import OverFlowButton from './OverflowButton';
import { default as ButtonInternal, ButtonProps } from './Button';

interface CompoundedComponent
  extends React.ForwardRefExoticComponent<
    ButtonProps & React.RefAttributes<HTMLElement>
  > {
  Overflow: typeof OverFlowButton;
}

const Button = ButtonInternal as CompoundedComponent;
Button.Overflow = OverFlowButton;

export default Button;
