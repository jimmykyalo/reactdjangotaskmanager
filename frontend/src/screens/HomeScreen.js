import React, {useState, useEffect} from 'react'
import {  ListGroup, Offcanvas, FormCheck, Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listTasks, updateTasks } from '../actions/taskActions'
import Task from '../components/Task';
import { IoMdAdd } from 'react-icons/io'
import { FaTrashAlt, FaPlus, FaStar, FaCheck, FaRegStar, FaRegEdit, FaTimes  } from 'react-icons/fa'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import AddTaskForm from '../components/AddTaskForm';
import { TASK_CREATE_RESET, TASK_UPDATE_RESET } from '../constants/taskConstants'
import { Button, Tooltip } from '@mui/material';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';

function HomeScreen() {
  const [selectAll, setSelectAll] = useState(false)
  const [taskModal, setTaskModal] = useState(false)
  const [editMode, setEditMode] = useState(false)

  const dispatch = useDispatch()

  const userLogin = useSelector(state=>state.userLogin)
  const {userInfo } = userLogin

  const taskList = useSelector(state=>state.taskList)
  const {loading, error, tasks } = taskList

  const taskCreate = useSelector(state=>state.taskCreate)
  const {success:successCreate} = taskCreate

  const taskUpdate = useSelector(state=>state.taskUpdate)
  const {success:successUpdate, loading:loadingUpdate, error: errorUpdate} = taskUpdate

  

  useEffect(() => {
    setSelectAll(false)
    userInfo && dispatch(listTasks())

    if (successCreate){
      dispatch({type:TASK_CREATE_RESET})
    }

    if (successUpdate){
      dispatch({type:TASK_UPDATE_RESET})
    }
    
  }, [dispatch, userInfo, successCreate, successUpdate])

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleUpdateStatus = (attribute, status)=>{
    
    var elementsArray = ([...document.getElementsByClassName("form-check-input")]).filter(item=>item.checked && item.dataset.id)
    if(elementsArray.length===0){
      alert('No tasks Selected')
      return;
    }
    var tasksArray = elementsArray.map(element => {
        return {_id:element.dataset.id, attribute, value:status}
    });
    if(attribute==='completed'){
      setValue(value==='2'?'1':'2')
    }
    dispatch(updateTasks(tasksArray))
  }

  const handleSelectAll =(value)=>{
    setSelectAll(value)
    var elements = document.getElementsByClassName("form-check-input")

    for(let i=0;i<elements.length;i++ ){
      elements[i].checked=value
    }
    
  }

  

  
  return (
    <Container fluid className='home d-flex flex-column'>
      <AddTaskForm taskShow={taskModal} setTaskShow={setTaskModal} />
      {loading || loadingUpdate ?<Loader /> : error || errorUpdate ? <Message severity={'error'}>{error || errorUpdate}</Message>:
      <>
        <div className='menu-bar d-flex flex-row'>
          <h2 className="menu-bar-heading">
            Task List
          </h2>
          <div className="menu-bar-buttons">
            {value==='2' ? <Tooltip arrow title="Mark as Incomplete"><span><FaTimes onClick={()=>handleUpdateStatus('completed', false)} className='menu-bar-buttons-icon' /></span></Tooltip>:<Tooltip arrow title="Mark as Complete"><span><FaCheck onClick={()=>handleUpdateStatus('completed', true)} className='menu-bar-buttons-icon' /></span></Tooltip>}
            <Tooltip arrow title="Delete">
              <span>
                <FaTrashAlt className='menu-bar-buttons-icon' />
              </span>
            </Tooltip>

            <Tooltip arrow title="Mark as Important">
              <span>
                <FaStar onClick={()=>handleUpdateStatus('important', true)}  className='menu-bar-buttons-icon' />
              </span>
            </Tooltip>

            <Tooltip arrow title="Mark as Not Important">
              <span>
                <FaRegStar onClick={()=>handleUpdateStatus('important', false)}  className='menu-bar-buttons-icon' />
              </span>
            </Tooltip>

            <Tooltip arrow title="Add New Task">
              <span>
                <FaPlus onClick={()=>setTaskModal(true)} className='menu-bar-buttons-icon' />
              </span>
            </Tooltip>

            
            
          </div>
        </div>
        
          <TabContext value={value}>
       
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab onClick={()=>handleSelectAll(false)} sx={{width:'4rem', textTransform:'capitalize'}} label="To do" value="1" />
                <Tab onClick={()=>handleSelectAll(false)} sx={{width:'4rem', textTransform:'capitalize'}} label="Completed" value="2" />
                
              </TabList>
            
            <TabPanel sx={{padding:'1rem 0'}} value="1">
              <div className="controls">
                <FormCheck className='select-all' checked={selectAll} onChange={(e)=>handleSelectAll(e.target.checked)} label='Select All' />
                <div className="controls-edit-buttons">
                  <Button onClick={()=>setEditMode(!editMode)} size='small' color='inherit' variant="outlined" startIcon={<FaRegEdit />}>{editMode?'Disable':'Edit'}</Button>
                  {editMode && <Button size='small' color='inherit' variant="outlined" startIcon={<SaveRoundedIcon />}>Save</Button>}
                </div>
              </div>
              <ListGroup className='task-list'>
                {tasks.filter(item=>!item.completed).map(task=>(
                    <Task editMode={editMode} selectAll={selectAll} setSelectAll={setSelectAll} task={task} key={task._id} />
                ))}
              </ListGroup>
            </TabPanel>
            <TabPanel  sx={{padding:'1rem 0'}} value="2">
              <div className="controls">
                <FormCheck className='select-all' checked={selectAll} onChange={(e)=>handleSelectAll(e.target.checked)} label='Select All' />
                <div className="controls-edit-buttons">
                  <Button onClick={()=>setEditMode(!editMode)} size='small' color='inherit' variant="outlined" startIcon={<FaRegEdit />}>{editMode?'Disable':'Edit'}</Button>
                  {editMode && <Button size='small' color='inherit' variant="outlined" startIcon={<SaveRoundedIcon />}>Save</Button>}
                  
                </div>
              </div>
              <ListGroup className='task-list'>
                {tasks.filter(item=>item.completed).map(task=>(
                    <Task completed editMode={editMode} selectAll={selectAll} setSelectAll={setSelectAll} task={task} key={task._id} />
                ))}
              </ListGroup>
            </TabPanel>
            
          </TabContext>
        </>      
      }
      


    </Container>
  )
}

export default HomeScreen