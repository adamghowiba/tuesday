import { ChangeEvent } from 'react';

export interface RadioGroupContextProps {
  name: string;
  onChange?: (value: any, event: ChangeEvent) => void;
  minWidth?: number;
  value?: any;
  disabled?: boolean;
}
