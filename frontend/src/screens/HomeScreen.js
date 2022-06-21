import React, {useState, useEffect} from 'react'
import {  ListGroup, Spinner, FormCheck, Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../components/Loader';
import Message from '../components/Message';
import { deleteTasks, listTasks, updateTasks } from '../actions/taskActions'
import Task from '../components/Task';
import { IoMdAdd } from 'react-icons/io'
import { FaTrashAlt, FaPlus, FaStar, FaCheck, FaRegStar, FaRegEdit, FaTimes  } from 'react-icons/fa'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import AddTaskForm from '../components/AddTaskForm';
import { TASK_CREATE_RESET, TASK_DELETE_RESET, TASK_UPDATE_RESET, TASK_UPDATE_SUCCESS } from '../constants/taskConstants'
import { Button, Tooltip } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import axios from 'axios';
import { useHistory } from 'react-router-dom'

function HomeScreen({important}) {
  const history = useHistory()
  const [selectAll, setSelectAll] = useState(false)
  const [taskModal, setTaskModal] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [updatingImportance, setUpdatingImportance] = useState(false)
  const [markingId, setMarkingId] = useState(0)
  const [changesArray, setChangesArray] = useState([])
  const [selectedList, setSelectedList] = useState(0)

  const dispatch = useDispatch()

  const userLogin = useSelector(state=>state.userLogin)
  const {userInfo } = userLogin

  const taskList = useSelector(state=>state.taskList)
  const {loading, error, tasks } = taskList

  const listList = useSelector(state=>state.listList)
  const {loading:loadingList, error:errorList, lists } = listList

  const taskCreate = useSelector(state=>state.taskCreate)
  const {success:successCreate} = taskCreate

  const taskUpdate = useSelector(state=>state.taskUpdate)
  const {success:successUpdate, loading:loadingUpdate, error: errorUpdate} = taskUpdate

  const taskDelete = useSelector(state=>state.taskDelete)
  const {success:successDelete, loading:loadingDelete, error: errorDelete} = taskDelete

  

  useEffect(() => {
    setSelectAll(false)
    userInfo && dispatch(listTasks())

    if (successCreate){
      dispatch({type:TASK_CREATE_RESET})
    }
    if (successUpdate){
      setEditMode(false)
      dispatch({type:TASK_UPDATE_RESET})
    }

    if (successDelete){
      dispatch({type:TASK_DELETE_RESET})
    }    
  }, [dispatch, userInfo, successCreate, successUpdate, successDelete])

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

  const handleDeleteTasks = ()=>{
    
    var elementsArray = ([...document.getElementsByClassName("form-check-input")]).filter(item=>item.checked && item.dataset.id)
    if(elementsArray.length===0){
      alert('No tasks Selected')
      return;
    }
    
    var tasksArray = elementsArray.map(element => {
        return {_id:element.dataset.id}
    });
    
    window.confirm(`Permanently Delete this task(s)? This action is irreversible`) && dispatch(deleteTasks(tasksArray))
  }

  const handleSelectAll =(value)=>{
    setSelectAll(value)
    var elements = document.getElementsByClassName("form-check-input")

    for(let i=0;i<elements.length;i++ ){
      elements[i].checked=value
    }
    
  }

  const markImportanceHandler = async(taskId) =>{
    setMarkingId(taskId)
    setUpdatingImportance(true)
    const attribute = 'important'
    try {
      const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
      }

      const { data } = await axios.post(
          `/api/tasks/mark/`,
          {taskId, attribute},
          config
      )
      setChangesArray([...changesArray, data._id])
      setUpdatingImportance(false)
      setMarkingId(0)
      important && dispatch({type:TASK_UPDATE_SUCCESS})
    } catch (error) {
      setUpdatingImportance(false)
      setMarkingId(0)
    }
  }

  const handleListChange = (e) => {
    var elementsArray = ([...document.getElementsByClassName("form-check-input")]).filter(item=>item.checked && item.dataset.id)
    if(elementsArray.length===0){
      alert('No tasks Selected')
      return;
    }
    userInfo && handleUpdateStatus('list', e.target.value)
    setSelectedList(e.target.value);
    history.push(`/list/${e.target.value}/`)
    
  };

  

  
  return (
    <Container fluid className='home d-flex flex-column'>
      <AddTaskForm taskShow={taskModal} setTaskShow={setTaskModal} />
      {loading || loadingUpdate || loadingDelete || loadingList ?<Loader /> : error || errorUpdate || errorDelete || errorList ? <Message severity='error'>{error || errorUpdate || errorDelete || errorList}</Message>:''}
      <>
        <div className='menu-bar d-flex flex-row'>
          <h2 className="menu-bar-heading">
            Task List
          </h2>
          <div className="menu-bar-buttons">
            {value==='2' ? <Tooltip arrow title="Mark as Incomplete"><span><FaTimes onClick={()=>handleUpdateStatus('completed', false)} className='menu-bar-buttons-icon' /></span></Tooltip>:<Tooltip arrow title="Mark as Complete"><span><FaCheck onClick={()=>handleUpdateStatus('completed', true)} className='menu-bar-buttons-icon' /></span></Tooltip>}
            <Tooltip arrow title="Delete">
              <span>
                <FaTrashAlt onClick={()=>handleDeleteTasks()} className='menu-bar-buttons-icon' />
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

            <Tooltip arrow title="Add To List">
              <span>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedList}
                label="List"
                onChange={handleListChange}
                size='small'
                color='primary'
                sx={{color:'#fff', outlineColor:'#fff'}}
              >
                <MenuItem disabled value={0}>List</MenuItem>
                {lists.map(list=>(
                  <MenuItem key={list._id} value={list._id}>{list.name}</MenuItem>
                ))}
              </Select>
              </span>
            </Tooltip>

            
            
          </div>
        </div>
        
          <TabContext value={value}>
       
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab onClick={()=>handleSelectAll(false)} sx={{width:'4rem', textTransform:'capitalize', ['@media (max-width:900px)']: { // eslint-disable-line no-useless-computed-key
      width: 'auto'
    }}} label="To do" value="1" />
                <Tab onClick={()=>handleSelectAll(false)} sx={{width:'4rem', textTransform:'capitalize', ['@media (max-width:900px)']: { // eslint-disable-line no-useless-computed-key
      width: 'auto'
    }}} label="Completed" value="2" />
                
              </TabList>
            
            <TabPanel sx={{padding:'1rem 0'}} value="1">
              <div className="controls">
                <FormCheck className='select-all' checked={selectAll} onChange={(e)=>handleSelectAll(e.target.checked)} label='Select All' />
                <div className="controls-edit-buttons">
                  <Button onClick={()=>setEditMode(!editMode)} size='small' color='inherit' variant="outlined" startIcon={<FaRegEdit />}>{editMode?'Disable':'Edit'}</Button>
                  
                </div>
              </div>
              <ListGroup className='task-list'>
                {tasks.filter(item=>important?!item.completed && item.important:!item.completed).map(task=>(
                    <Task changedImportance={ ((changesArray.filter((v) => (v === task._id)).length)%2)===1} clickfunction={()=>markImportanceHandler(task._id)} updatingImportance={task._id===markingId} editMode={editMode} selectAll={selectAll} setSelectAll={setSelectAll} task={task} key={task._id} />
                ))}
              </ListGroup>
            </TabPanel>
            <TabPanel  sx={{padding:'1rem 0'}} value="2">
              <div className="controls">
                <FormCheck className='select-all' checked={selectAll} onChange={(e)=>handleSelectAll(e.target.checked)} label='Select All' />
                <div className="controls-edit-buttons">
                  <Button onClick={()=>setEditMode(!editMode)} size='small' color='inherit' variant="outlined" startIcon={<FaRegEdit />}>{editMode?'Disable':'Edit'}</Button>
                  
                  
                </div>
              </div>
              <ListGroup className='task-list'>
                {tasks.filter(item=>important?item.completed && item.important:item.completed).map(task=>(
                    <Task clickfunction={()=>markImportanceHandler(task._id)} changedImportance={ ((changesArray.filter((v) => (v === task._id)).length)%2)===1} updatingImportance={task._id===markingId} completed editMode={editMode} selectAll={selectAll} setSelectAll={setSelectAll} task={task} key={task._id} />
                ))}
              </ListGroup>
            </TabPanel>
            
          </TabContext>
        </>      
      
      


    </Container>
  )
}

export default HomeScreen