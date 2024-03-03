import { Button,Form,InputGroup } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import React, {useState} from 'react'


function SearchBox() {
    const history = useParams()
    const [keyword, setKeyword] = useState('')
    const submitHandler = (e) => {
        e.preventDefault()
        console.log('PRESSED!')
    }
    return (
            <Form onSubmit={submitHandler} inline='true'>
            <Form.Control type='text' name='q' onChange={(e)=> setKeyword(e.target.value)} className='mr-sm-2 ml-sm-5' placeholder="Search" />
            <Button type='submit' variant="outline-secondary" className='p-2'>🔍</Button>
            </Form>
    );
}

export default SearchBox;
