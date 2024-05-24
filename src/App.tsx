import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useReducer } from 'react';
import { State, Action } from './types.d';

const initialState: State = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  fromText: '',
  result: '',
  loading: false,
};

function reducer(state: State, action: Action) {
  const { type } = action;

  switch (type) {
    case 'SWITCH_LANGUAGE': {
      return {
        ...state,
        fromLanguage: state.toLanguage,
        toLanguage: state.fromLanguage,
      };
    };

    case 'SET_FROM_LANGUAGE': {
      return {
        ...state,
        fromLanguage: action.payload
      };
    };

    case 'SET_TO_LANGUAGE' : {
      return {
        ...state,
        toLanguage: action.payload
      };
    };

    case 'SET_FROM_TEXT' : {
      return {
        ...state,
        loading: true,
        fromText: action.payload
      };
    };

    case 'SET_RESULT' : {
      return {
        ...state,
        loading: false,
        result: action.payload
      };
    };
  }

  return state;
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { fromLanguage, toLanguage, fromText, result, loading } = state;

  function handleClick () {
    dispatch({
      type : 'SET_FROM_LANGUAGE',
      payload: 'espa'
    })
  }
  return (
    <>
      <h1>HI</h1>
      <button onClick={handleClick}>Change Language {fromLanguage}</button>
    </>
  );
}

export default App;
