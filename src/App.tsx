import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import useLanguages from './hooks/useLanguage';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { AUTO_LANGUAGE } from './constants';
import { ArrowIcon } from './assets/ArrowIcon';
import LanguageSelector from './components/LanguageSelector';
import { SectionType } from './types.d';

function App() {
  const { fromLanguage, toLanguage, setFromLanguage, setToLanguage, switchLanguages } = useLanguages();

  return (
    <Container fluid>
      <h1>Language Translator</h1>
      
      <Row>
        <Col>
          <LanguageSelector type= {SectionType.From} value= {fromLanguage} onChange={setFromLanguage}/>
          {fromLanguage}
        </Col>

        <Col>
          <Button variant='link' disabled={fromLanguage === AUTO_LANGUAGE} onClick={switchLanguages}>
            <ArrowIcon/>
          </Button>
        </Col>

        <Col>
          <LanguageSelector type={SectionType.To} value={toLanguage} onChange={setToLanguage}/>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
