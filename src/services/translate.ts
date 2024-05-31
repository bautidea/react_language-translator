import Configuration from 'openai'
import {OpenAIApi} from 'openai'
const apiKey = import.meta.env.VITE_OPENAI_API_KEY

const config = new Configuration({ apiKey })
const openai = new OpenAIApi(config)