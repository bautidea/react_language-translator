import { Button, Overlay, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { CopyTextIcon } from '../assets/Icons';
import './CopyTextButton.css';
import { useRef, useState } from 'react';

type Props = {
  valueToCopy: string;
};

const CopyText = ({ valueToCopy }: Props) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const targetButton = useRef(null);

  function handleCopy() {
    navigator.clipboard.writeText(valueToCopy);
    setShowTooltip(true);

    setTimeout(() => setShowTooltip(false), 1000);
  }

  return (
    <>
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip>Copy translation</Tooltip>}
      >
        <Button className="button" onClick={handleCopy} ref={targetButton}>
          <CopyTextIcon />
        </Button>
      </OverlayTrigger>

      <Overlay placement="top" target={targetButton.current} show={showTooltip}>
        <Tooltip className="tooltip">Translation copied!!</Tooltip>
      </Overlay>
    </>
  );
};

export default CopyText;
