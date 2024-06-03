import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import useLanguages from './hooks/useLanguage';
import { Container, Row, Col, Button, Stack } from 'react-bootstrap';
import { AUTO_LANGUAGE } from './constants';
import { ArrowIcon } from './assets/ArrowIcon';
import LanguageSelector from './components/LanguageSelector';
import { SectionType } from './types.d';
import TextArea from './components/TextArea';
import { translate } from './services/translate';

function App() {
  const { 
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    switchLanguages, 
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult
  } = useLanguages();

  const handleClick = async () => {
    await translate({fromLanguage, toLanguage, textToTranslate: fromText})
  }

  return (
    <Container fluid>
      <h1>Language Translator</h1>
      
      <Row>
        <Col >
          <Stack gap={2}>
            <LanguageSelector type= {SectionType.From} value= {fromLanguage} onChange={setFromLanguage}/>

            <TextArea type={SectionType.From} value={fromText} onChange={setFromText}/>
          </Stack>
        </Col>

        <Col xs={1} >
          <Button variant='link' disabled={fromLanguage === AUTO_LANGUAGE} onClick={switchLanguages}>
            <ArrowIcon/>
          </Button>
        </Col>

        <Col >
          <Stack gap={2}>
            <LanguageSelector type={SectionType.To} value={toLanguage} onChange={setToLanguage}/>
            
            <TextArea type={SectionType.To} value={result} loading={loading} onChange={setResult}/>
          </Stack>
        </Col>
      </Row>

      <button onClick={handleClick}>Translate</button>
    </Container>
  );
}

export default App;
