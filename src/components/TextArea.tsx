import { Form } from "react-bootstrap";
import { SectionType } from "../types.d";
import './TextArea.css'

type Props = {
  type: SectionType, 
  value: string, 
  loading?: boolean, 
  onChange: ( text: string ) => void
}

function getPlaceholder ({type, loading}) {
  if (type === SectionType.From) return 'Enter Text ...'
  if (loading === true) return 'Translating...'
  return 'Translation'
}

function TextArea ({ type, value, loading, onChange } : Props) {
  // Defining props based on type.
  const autoFocus = type === SectionType.From ? true : false 
  const typeClassName = type === SectionType.From ? 'fromTextArea' : 'resultTextArea'
  const disables = type === SectionType.From ? false : true

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) =>{
    onChange(event.target.value)
  }

  return (
    <Form.Control 
      as='textarea' placeholder={getPlaceholder({type, loading })} 
      autoFocus={autoFocus} 
      className={`commonStyles ${typeClassName}`} 
      onChange={handleChange}
      disabled={disables}
    />
  )
}

export default TextArea;