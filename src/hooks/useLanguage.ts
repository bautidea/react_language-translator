import { useReducer } from 'react';
import { State, Action, Languages, FromLanguage } from '../types.d';

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
    }

    case 'SET_FROM_LANGUAGE': {
      return {
        ...state,
        fromLanguage: action.payload,
      };
    }

    case 'SET_TO_LANGUAGE': {
      return {
        ...state,
        toLanguage: action.payload,
      };
    }

    case 'SET_FROM_TEXT': {
      return {
        ...state,
        loading: true,
        fromText: action.payload,
      };
    }

    case 'SET_RESULT': {
      return {
        ...state,
        loading: false,
        result: action.payload,
      };
    }
  }

  return state;
}

function useLanguages() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { fromLanguage, toLanguage, fromText, result, loading } = state;

  function switchLanguages() {
    dispatch({
      type: 'SWITCH_LANGUAGE',
    });
  }

  function setFromLanguage(newFromLanguage: FromLanguage) {
    dispatch({
      type: 'SET_FROM_LANGUAGE',
      payload: newFromLanguage,
    });
  }

  function setToLanguage(newToLanguage: Languages) {
    dispatch({
      type: 'SET_TO_LANGUAGE',
      payload: newToLanguage,
    });
  }

  function setFromText(fromText: string) {
    dispatch({
      type: 'SET_FROM_TEXT',
      payload: fromText,
    });
  }

  function setResult(result: string) {
    dispatch({
      type: 'SET_RESULT',
      payload: result,
    });
  }

  return {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    switchLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult,
  };
}

export default useLanguages;
