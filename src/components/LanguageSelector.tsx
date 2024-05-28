import { Form } from "react-bootstrap"
import { SUPPORTED_LANGUAGES } from "../constants"
import { FunctionComponent } from "react"
import { Languages } from "../types"

interface Props {
  onChange : (language : Languages) => void
}

const LanguageSelector : FunctionComponent<Props> = ({ onChange }) =>  {
  function handleChange (event: React.ChangeEvent<HTMLSelectElement>) {
    onChange(event.target.value as Languages)
  }

  return (
    <Form.Select onChange={handleChange}>
      {/* 
        Since 'SUPPORTED_LANGUAGES' is an object not an array i cant use '.map()' method 
        i have to use the 'Object.entries()' method that returns an array of given objects
        own enumerable string-keyed property like [ key, value ].
      */}
      {Object.entries(SUPPORTED_LANGUAGES).map( ([ key, value ]) => (
        <option key={ key } value={ key }>
          { value }
        </option>
      ))}
    </Form.Select>
  )
}   

export default LanguageSelector