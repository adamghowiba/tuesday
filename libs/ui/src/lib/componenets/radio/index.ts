import { default as RadioInternal, RadioProps } from './Radio';
import { default as RadioGroup } from './RadioGroup';

interface CompoundedComponent
  extends React.ForwardRefExoticComponent<
    RadioProps & React.RefAttributes<HTMLElement>
  > {
  Group: typeof RadioGroup;
}

const Radio = RadioInternal as CompoundedComponent;
Radio.Group = RadioGroup;

export default Radio;
