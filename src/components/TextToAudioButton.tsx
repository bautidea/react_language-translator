import { Button } from 'react-bootstrap';
import { TextToAudioIcon } from '../assets/Icons';
import { FromLanguage, Languages } from '../types';
import { SPEECH_LANGUAGES } from '../constants';

type Props = {
  valueToSpeak: string;
  buttonClassName: string;
  languageToSpeak: FromLanguage | Languages;
};

const TextToAudioButton = ({
  valueToSpeak,
  buttonClassName,
  languageToSpeak,
}: Props) => {
  function handleClick() {
    const utterance = new SpeechSynthesisUtterance(valueToSpeak);
    const lang = SPEECH_LANGUAGES[languageToSpeak];

    utterance.lang = lang;
    window.speechSynthesis.speak(utterance);
  }

  return (
    <Button className={buttonClassName} onClick={handleClick}>
      <TextToAudioIcon />
    </Button>
  );
};

export default TextToAudioButton;
