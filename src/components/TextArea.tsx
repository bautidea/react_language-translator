import { Form } from 'react-bootstrap';
import { FromLanguage, Languages, SectionType } from '../types.d';
import './TextArea.css';
import CopyTextButton from './CopyTextButton';
import TextToAudioButton from './TextToAudioButton';

type Props = {
  type: SectionType;
  value: string;
  loading?: boolean;
  onChange: (text: string) => void;
  language: FromLanguage | Languages;
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

function TextArea({ type, value, loading, onChange, language }: Props) {
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

      {value !== '' && (
        <div className="buttonContainer">
          {type === SectionType.To && (
            <CopyTextButton valueToCopy={value} buttonClassName="button" />
          )}

          <TextToAudioButton
            valueToSpeak={value}
            buttonClassName="button"
            languageToSpeak={language}
          />
        </div>
      )}
    </div>
  );
}

export default TextArea;
