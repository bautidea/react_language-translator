import { Form } from "react-bootstrap";
import { SectionType } from "../types.d";

type Props = {
  type: SectionType, 
  value: string, 
  loading?: boolean, 
  onChange: ( text: string ) => void
}

function TextArea ({ type, value, loading, onChange } : Props) {
    // Defining props based on type.
    const placeholder = type === SectionType.From ? 'Enter text...' : 'Translation'
    const autoFocus = type === SectionType.From ? true : false 
    const disabled = type === SectionType.From ? false : true
  
    return (
        <Form.Control as='textarea' placeholder={placeholder} autoFocus={autoFocus} disabled={disabled} style={{height: '200px'}}/>
    )
}

export default TextArea;