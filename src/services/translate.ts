import { CohereClient } from "cohere-ai"
import { FromLanguage, Languages } from "../types.d"
import { SUPPORTED_LANGUAGES } from "../constants"

type Props = {
  fromLanguage : FromLanguage,
  toLanguage: Languages,
  textToTranslate: string
}

const token = import.meta.env.VITE_COHERE_API_KEY

const cohere = new CohereClient({ token })

export async function translate ({ fromLanguage, toLanguage, textToTranslate } : Props) {
  // If both languages are the same we return the same text to be translated.
  if (fromLanguage === toLanguage) return textToTranslate;

  const fromLiteral = fromLanguage === 'auto' ? 'auto' : SUPPORTED_LANGUAGES[fromLanguage]
  const toLiteral = SUPPORTED_LANGUAGES[toLanguage]
  
  // Preambles are part of the prompt used to adjust the model's overall behavior.
  const preamble = "You will be provided with a sentence from the user, and your task is to translate it into a desired language.\
                    The language of origin is wrapped inside '{{' and '}}', you could also receive {{auto}} which means that you \
                    should detect the language. The language to translate its surrounded by '[[' and ']]'.\
                    Input example {{originalLanguage / auto}} to [[languageToTranslate]]: textToBeTranslated"
  
  try {
    const chatStream = await cohere.chatStream({
      model:'command-r',
      message: `{{${fromLiteral}}} to [[${toLiteral}]]: ${textToTranslate}`,
      temperature: 0.3,
      preamble: preamble
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