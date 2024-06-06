import { useReducer } from 'react';
import { State, Action, Languages, FromLanguage } from '../types.d';
import { AUTO_LANGUAGE } from '../constants';

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
      if (state.fromLanguage === AUTO_LANGUAGE) return state

      return {
        ...state,
        result: '',
        fromText: state.result,
        fromLanguage: state.toLanguage,
        toLanguage: state.fromLanguage,
      };
    }

    case 'SET_FROM_LANGUAGE': {
      if (state.fromLanguage === action.payload) return state

      const loading = state.fromText !== ''

      return {
        ...state,
        loading,
        result: '',
        fromLanguage: action.payload,
      };
    }

    case 'SET_TO_LANGUAGE': {
      if (state.toLanguage === action.payload) return state

      const loading = state.fromText !== ''

      return {
        ...state,
        loading,
        result: '',
        toLanguage: action.payload,
      };
    }

    case 'SET_FROM_TEXT': {
      const loading = action.payload !== ''

      return {
        ...state,
        loading,
        result: '',
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
