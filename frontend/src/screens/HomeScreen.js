import React, {useState, useEffect} from 'react'
import { Button, ListGroup, Offcanvas, FormCheck, Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listTasks } from '../actions/taskActions'
import Task from '../components/Task';
import { IoMdAdd } from 'react-icons/io'

function HomeScreen() {
  const dispatch = useDispatch()
  const userLogin = useSelector(state=>state.userLogin)
  const {userInfo } = userLogin

  const taskList = useSelector(state=>state.taskList)
  const {loading, error, tasks } = taskList

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    userInfo && dispatch(listTasks())
  }, [dispatch, userInfo])
  

  
  return (
    <Container className='home d-flex flex-column'>
      {loading ?<Loader /> : error ? <Message severity={'error'}>{error}</Message>:
      <>
        <div className='menu-bar d-flex flex-row'>
          <h2 className="menu-bar-heading">
            Task List
          </h2>
          <div className="menu-buttons">
            <IoMdAdd className='menu-buttons-icon' />
          </div>
        </div>

        <Offcanvas placement='end' show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Offcanvas</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            Some text as placeholder. In real life you can have the elements you
            have chosen. Like, text, images, lists, etc.
          </Offcanvas.Body>
        </Offcanvas>

        
          <ListGroup >
            {tasks.map(task=>(
              <Task task={task} key={task._id} />
            ))}
          </ListGroup>
        </>      
      }


    </Container>
  )
}

export default HomeScreen