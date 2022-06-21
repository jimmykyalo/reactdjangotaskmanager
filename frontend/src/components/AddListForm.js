import React, { useState, useEffect } from 'react'
import { Form, Modal } from 'react-bootstrap'
import { Button} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useDispatch, useSelector } from 'react-redux';
import { createList } from '../actions/listActions';
import { useHistory } from 'react-router-dom'
import Loader from './Loader'
import Message from './Message'

function AddListForm({listShow, setListShow}) {
    const history = useHistory()
    const listCreate = useSelector(state=>state.listCreate)
    const {error, loading, success} = listCreate

    const dispatch = useDispatch()
    const handleClose = () => setListShow(false);

    useEffect(() => {
      if(success){
        setListShow(false)
        history.push('/')
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [history, success])
    
    // form submit function
    const onSubmitHandler = (e)=>{
        e.preventDefault()
        dispatch(createList({name,description}))
    }
    // form input variables
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    
  return (
    <Modal show={listShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add List</Modal.Title>
        </Modal.Header>
        <Modal.Body className='pt-0'>
            {loading && <Loader /> }
            {error && <Message severity={'error'}>{error}</Message> }
            <Form onSubmit={onSubmitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control required value={name} onChange={(e)=>setName(e.target.value)} type='text' />
                </Form.Group>

                <Form.Group controlId='description'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={2} value={description} onChange={(e)=>setDescription(e.target.value)}  />
                </Form.Group>

                
                <Button sx={{marginTop:'2rem'}} type='submit' fullWidth variant="contained" startIcon={<SaveIcon />}>
                    Save
                </Button>
            </Form>

        </Modal.Body>
      </Modal>
  )
}

export default AddListForm