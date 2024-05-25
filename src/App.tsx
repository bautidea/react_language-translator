import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import useLanguages from './hooks/useLanguage';

function App() {
  const { fromLanguage, setFromLanguage } = useLanguages();

  function handleClick() {
    setFromLanguage('ur');
  }

  return (
    <>
      <h1>HI</h1>
      <button onClick={handleClick}>Change Language {fromLanguage}</button>
    </>
  );
}

export default App;
