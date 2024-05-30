import { Form } from "react-bootstrap";

function TextArea ({ type, value, loading, onChange }) {
    // Defining placeholder based on the type.
    const placeholder = type==='from' ? 'Enter text...' : 'Translation'

    return (
        <Form.Control as='textarea' placeholder={placeholder} autoFocus style={{ height: '200px' }}/>
    )
}

export default TextArea;