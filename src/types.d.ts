import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from './constants';

// By using the 'SUPPORTED_LANGUAGES' object, we can retrieve the type of
// the declared key of that object.
export type Languages = keyof typeof SUPPORTED_LANGUAGES;
export type AutoLanguage = typeof AUTO_LANGUAGE;
// Since 'FromLanguage' can be 'auto' in order to identify the written language
// i've to declare that.
export type FromLanguage = Languages | AutoLanguage;

export interface State {
  fromLanguage: FromLanguage;
  toLanguage: Languages;
  fromText: string;
  result: string;
  loading: boolean;
}

export type Action =
  | { type: 'SWITCH_LANGUAGE' }
  | { type: 'SET_FROM_LANGUAGE'; payload: FromLanguage }
  | { type: 'SET_TO_LANGUAGE'; payload: Languages }
  | { type: 'SET_FROM_TEXT'; payload: string }
  | { type: 'SET_RESULT'; payload: string };

// 'enum' is a way in which we can have like a dictionary that is constant.
// 'enums' are useful to avoid typing a string, we have in one place all 
export enum SectionType {
  From = 'from',
  To = 'to'
}