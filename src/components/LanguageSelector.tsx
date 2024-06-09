import { Form } from 'react-bootstrap';
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from '../constants';
import { FunctionComponent } from 'react';
import { FromLanguage, Languages, SectionType } from '../types.d';

// Here im controlling props based on the type parameter.
type Props =
  | {
      type: SectionType.From;
      value: FromLanguage;
      onChange: (language: FromLanguage) => void;
    }
  | {
      type: SectionType.To;
      value: Languages;
      onChange: (language: Languages) => void;
    };

const LanguageSelector: FunctionComponent<Props> = ({
  type,
  value,
  onChange,
}) => {
  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    onChange(event.target.value as Languages);
  }

  return (
    <Form.Select
      onChange={handleChange}
      value={value}
      style={{ 'fontSize': ' 20px' }}
    >
      {type === SectionType.From && (
        <option value={AUTO_LANGUAGE}>Detect Language</option>
      )}
      {/* 
        Since 'SUPPORTED_LANGUAGES' is an object not an array i cant use '.map()' method 
        i have to use the 'Object.entries()' method that returns an array of given objects
        own enumerable string-keyed property like [ key, value ].
      */}
      {Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
        <option key={key} value={key}>
          {literal}
        </option>
      ))}
    </Form.Select>
  );
};

export default LanguageSelector;
