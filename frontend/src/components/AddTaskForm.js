import React, { useState, useEffect } from 'react'
import { Form, Modal } from 'react-bootstrap'
import { Button} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useDispatch, useSelector } from 'react-redux';
import { createTask } from '../actions/taskActions';
import { useHistory } from 'react-router-dom'
import Loader from './Loader'
import Message from './Message'

function AddTaskForm({taskShow, setTaskShow}) {
    const history = useHistory()
    const taskCreate = useSelector(state=>state.taskCreate)
    const {error, loading, success} = taskCreate

    const dispatch = useDispatch()
    const handleClose = () => setTaskShow(false);

    useEffect(() => {
      if(success){
        setTaskShow(false)
        history.push('/')
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [history, success])
    
    // form submit function
    const onSubmitHandler = (e)=>{
        e.preventDefault()
        dispatch(createTask({name,description,completed,important,startTime,endTime, completedTime:completed?completedTime:''}))
    }
    // form input variables
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [completed, setCompleted] = useState(false)
    const [important, setImportant] = useState(false)
    const [startTime, setStartTime] = useState(new Date())
    const [endTime, setEndTime] = useState(new Date())
    const [completedTime, setCompletedTime] = useState(new Date())
  return (
    <Modal show={taskShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
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

                <Form.Group controlId='startTime'>
                    <Form.Label>Start</Form.Label>
                    <Form.Control required value={startTime} onChange={(e)=>setStartTime(e.target.value)} type='datetime-local' />
                </Form.Group>

                <Form.Group controlId='endTime'>
                    <Form.Label>End</Form.Label>
                    <Form.Control required value={endTime} onChange={(e)=>setEndTime(e.target.value)} type='datetime-local' />
                </Form.Group>

                <Form.Group controlId='important'>
                    <Form.Label>Important</Form.Label>
                    <Form.Check checked={important} onChange={(e)=>setImportant(e.target.checked)} label='Mark as Important' />
                </Form.Group>

                <Form.Group controlId='completed'>
                    <Form.Label>Completed</Form.Label>
                    <Form.Check checked={completed} onChange={(e)=>setCompleted(e.target.checked)} label='Mark as Completed' />
                </Form.Group>

                {completed && <Form.Group controlId='completedTime'>
                    <Form.Label>Completed</Form.Label>
                    <Form.Control required value={completedTime} onChange={(e)=>setCompletedTime(e.target.value)} type='datetime-local' />
                </Form.Group>}

                <Button sx={{marginTop:'2rem'}} type='submit' fullWidth variant="contained" startIcon={<SaveIcon />}>
                    Save
                </Button>
            </Form>

        </Modal.Body>
      </Modal>
  )
}

export default AddTaskForm