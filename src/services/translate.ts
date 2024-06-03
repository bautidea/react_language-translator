import OpenAI from "openai"
import { FromLanguage, Languages } from "../types.d"
import { SUPPORTED_LANGUAGES } from "../constants"

type Props = {
  fromLanguage : FromLanguage,
  toLanguage: Languages,
  textToTranslate: string
}

const apiKey = import.meta.env.VITE_OPENAI_API_KEY

const openai = new OpenAI({apiKey, dangerouslyAllowBrowser: true })

export async function translate ({ fromLanguage, toLanguage, textToTranslate } : Props) {

  const fromLiteral = fromLanguage === 'auto' ? 'auto' : SUPPORTED_LANGUAGES[fromLanguage]
  const toLiteral = SUPPORTED_LANGUAGES[toLanguage]
  
  const messages = [
        {
          "role": "system",
          "content": "You will be provided with a sentence from the user, and your task is to translate it into a desired language. The language of origin is wrapped inside '{{' and '}}', you could also receive \
                    {{auto}} which means that you should detect the language. The language to translate its surrounded by '[[' and ']]'. an input example {{originalLanguage / auto}} to [[languageToTranslate]]: textToBeTranslated"
        },
        {
          "role": "user",
          "content": `{{${fromLiteral}}} to [[${toLiteral}]]: ${textToTranslate}`
        }
      ]
  
  const completion = await openai.chat.completions.create({
    model:'gpt-3.5-turbo',
    messages: messages as OpenAI.ChatCompletionMessageParam[],
    temperature: 0.7,
    max_tokens: 64,
    top_p: 1,
  })

  console.log(completion);
}