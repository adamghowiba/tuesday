import { Button, MenuV2, TextInput } from '@tuesday/ui';
import OverFlowButton from 'libs/ui/src/lib/componenets/button/OverflowButton';
import { useEffect, useRef, useState } from 'react';
import EditableInput from '../lib/componenets/global/EditableInput';

const Test = () => {
  const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false);
  const settingsMenuButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <div className="pad">
        <EditableInput type="text" value="Something">
          <h4>Some title</h4>
        </EditableInput>
      </div>

      <style jsx>{`
        .pad {
          margin: 6rem;
        }
      `}</style>
    </>
  );
};

export default Test;
