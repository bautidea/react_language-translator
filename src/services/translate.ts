import { CohereClient } from "cohere-ai"
import { FromLanguage, Languages } from "../types.d"
import { SUPPORTED_LANGUAGES } from "../constants"

type Props = {
  fromLanguage : FromLanguage,
  toLanguage: Languages,
  textToTranslate: string
}

type chatHistoryMessage = {
  role: 'USER' | 'CHATBOT',
  message: string
}

const token = import.meta.env.VITE_COHERE_API_KEY

const cohere = new CohereClient({ token })

export async function translate ({ fromLanguage, toLanguage, textToTranslate } : Props) {
  // If both languages are the same we return the same text to be translated.
  if (fromLanguage === toLanguage) return textToTranslate;

  const fromLiteral = fromLanguage === 'auto' ? 'auto' : SUPPORTED_LANGUAGES[fromLanguage]
  const toLiteral = SUPPORTED_LANGUAGES[toLanguage]
  
  // Preambles are part of the prompt used to adjust the model's overall behavior.
  const preamble = `
    You will be provided with a sentence from the user, and your task is to translate it into a desired language.
    The language of origin is wrapped inside '{{' and '}}', you could also receive {{auto}} which means that you 
    should detect the language. The language to translate its surrounded by '[[' and ']]'.
    Input example {{originalLanguage / auto}} to [[languageToTranslate]]: textToBeTranslated
    Your response should be consice and just contain the translated text, nothing more.
  `
  
  const chatHistory : chatHistoryMessage[] = [
    { role: 'USER', message: '{{Spanish}} to [[English]]: como es tu nombre'},
    { role: 'CHATBOT', message: 'What is your name'},

    { role: 'USER', message: '{{Spanish}} to [[Deutsche]]: como es tu nombre'},
    { role: 'CHATBOT', message: 'Wie heißt du'},

    { role: 'USER', message: '{{Spanish}} to [[Deutsche]]: como es tu nombre'},
    { role: 'CHATBOT', message: 'Wie heißt du'},

    { role: 'USER', message: '{{English}} to [[Deutsche]]: i love riding bikes'},
    { role: 'CHATBOT', message: 'Ich liebe es, Fahrrad zu fahren'},

    { role: 'USER', message: '{{auto}} to [[Spanish]]: la montaña es hermosa'},
    { role: 'CHATBOT', message: 'Der Berg ist wunderschön'},
  ]
  
  try {
    const chatStream = await cohere.chatStream({
      model:'command-r',
      message: `{{${fromLiteral}}} to [[${toLiteral}]]: ${textToTranslate}`,
      chatHistory,
      temperature: 0.1,
      preamble
    })
    
    for await (const message of chatStream) {
      if (message.eventType === 'stream-end') {
        return message.response.text
      }
    }
  } catch (error) {
    console.error(`Error during translation: ${error}`)
    return "Translation failed."
  }
}