import { Button } from 'react-bootstrap';
import { CopyTextIcon } from '../assets/Icons';
import './CopyTextButton.css';

type Props = {
  valueToCopy: string;
};

const CopyText = ({ valueToCopy }: Props) => {
  function handleCopy() {
    navigator.clipboard.writeText(valueToCopy);
    alert('Translation copied');
  }

  return (
    <div>
      <Button className="button" onClick={handleCopy}>
        <CopyTextIcon />
      </Button>
    </div>
  );
};

export default CopyText;
