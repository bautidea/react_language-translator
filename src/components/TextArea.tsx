import { Form } from 'react-bootstrap';
import { SectionType } from '../types.d';
import './TextArea.css';
import CopyTextButton from './CopyTextButton';

type Props = {
  type: SectionType;
  value: string;
  loading?: boolean;
  onChange: (text: string) => void;
};

type placeholderProps = {
  type: SectionType;
  loading?: boolean;
};

function getPlaceholder({ type, loading }: placeholderProps) {
  if (type === SectionType.From) return 'Enter Text ...';
  if (loading === true) return 'Translating...';
  return 'Translation';
}

function TextArea({ type, value, loading, onChange }: Props) {
  // Defining props based on type.
  const autoFocus = type === SectionType.From ? true : false;
  const typeClassName =
    type === SectionType.From ? 'fromTextArea' : 'resultTextArea';
  const disables = type === SectionType.From ? false : true;

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className={`${typeClassName}`} style={{ 'borderRadius': '0.8rem' }}>
      <Form.Control
        as="textarea"
        placeholder={getPlaceholder({ type, loading })}
        autoFocus={autoFocus}
        className={`commonStyles`}
        onChange={handleChange}
        disabled={disables}
        value={value}
      />

      <div className="buttonContainer">
        {type === SectionType.To && value !== '' && (
          <CopyTextButton valueToCopy={value} />
        )}
      </div>
    </div>
  );
}

export default TextArea;
