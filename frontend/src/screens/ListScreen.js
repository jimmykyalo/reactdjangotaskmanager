import React, {useState, useEffect} from 'react'
import {  ListGroup, Spinner, FormCheck, Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../components/Loader';
import Message from '../components/Message';
import { deleteTasks,  updateTasks } from '../actions/taskActions'
import Task from '../components/Task';
import { IoMdAdd } from 'react-icons/io'
import { FaTrashAlt, FaPlus, FaStar, FaCheck, FaRegStar, FaRegEdit, FaTimes, FaEdit  } from 'react-icons/fa'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import AddTaskForm from '../components/AddTaskForm';
import { TASK_CREATE_RESET, TASK_DELETE_RESET, TASK_UPDATE_RESET, TASK_UPDATE_SUCCESS } from '../constants/taskConstants'
import { Button, Tooltip } from '@mui/material';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import axios from 'axios';
import { listListDetails, updateLists } from '../actions/listActions';
import { LIST_UPDATE_RESET } from '../constants/listConstants';

function ListScreen({match}) {
  const [selectAll, setSelectAll] = useState(false)
  const [taskModal, setTaskModal] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [updatingImportance, setUpdatingImportance] = useState(false)
  const [markingId, setMarkingId] = useState(0)
  const [changesArray, setChangesArray] = useState([])
  const [editListMode, setEditListMode] = useState(false)

  const dispatch = useDispatch()

  const userLogin = useSelector(state=>state.userLogin)
  const {userInfo } = userLogin

  const listDetails = useSelector(state=>state.listDetails)
  const {loading, error, list } = listDetails

  const taskCreate = useSelector(state=>state.taskCreate)
  const {success:successCreate} = taskCreate

  const taskUpdate = useSelector(state=>state.taskUpdate)
  const {success:successUpdate, loading:loadingUpdate, error: errorUpdate} = taskUpdate

  const taskDelete = useSelector(state=>state.taskDelete)
  const {success:successDelete, loading:loadingDelete, error: errorDelete} = taskDelete

  const listUpdate = useSelector(state=>state.listUpdate)
  const {success:successListUpdate, error: errorListUpdate} = listUpdate

  

  

  useEffect(() => {
    setSelectAll(false)
    userInfo && dispatch(listListDetails(parseInt(match.params.id)))

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

    if (successListUpdate){
      setEditListMode(false)
      dispatch({type:LIST_UPDATE_RESET})
    }

    if (errorUpdate){
      
      setTimeout(() => {
        dispatch({type:TASK_UPDATE_RESET})
      }, 2500);
      
    }

    
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, userInfo, successCreate, successUpdate, successListUpdate, successDelete])

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
      
      setUpdatingImportance(false)
      setMarkingId(0)
      dispatch({type:TASK_UPDATE_SUCCESS})
    } catch (error) {
      setUpdatingImportance(false)
      setMarkingId(0)
    }
  }

  

  
  return (
    <Container fluid className='home d-flex flex-column'>
      <AddTaskForm taskShow={taskModal} setTaskShow={setTaskModal} />
      {loading || loadingUpdate || loadingDelete ?<Loader /> : error || errorUpdate || errorDelete || errorListUpdate ? <Message  severity={'error'}>{error || errorUpdate || errorDelete || errorListUpdate}</Message>:''}
      <>
        <div className='menu-bar d-flex flex-row mt-2'>
          <div className="menu-bar-heading">
            <h2 onBlur={(e)=>dispatch(updateLists([{_id:match.params.id, attribute:'name', value:e.target.innerText}]))} contentEditable={editListMode} suppressContentEditableWarning className='menu-bar-heading-text'>{list.name}</h2>
            <div onBlur={(e)=>dispatch(updateLists([{_id:match.params.id, attribute:'description', value:e.target.innerText}]))} contentEditable={editListMode} suppressContentEditableWarning className="menu-bar-heading-description">{list.description}</div>
          </div>
          <Tooltip arrow title="Edit List Details">
              <span className='menu-bar-buttons-edit'>
                <FaEdit onClick={()=>setEditListMode(!editListMode)} className='menu-bar-buttons-icon'  />
              </span>
            </Tooltip>
          
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

            
            
          </div>
        </div>
        
          <TabContext value={value}>
          
       
              <TabList onChange={handleChange} aria-label="List Tabs">
                <Tab onClick={()=>handleSelectAll(false)} sx={{width:'4rem', textTransform:'capitalize', ['@media (max-width:900px)']: { // eslint-disable-line no-useless-computed-key
                        width: 'auto'
                    }}} label="Important" value="1" />

                <Tab onClick={()=>handleSelectAll(false)} sx={{width:'4rem', textTransform:'capitalize', ['@media (max-width:900px)']: { // eslint-disable-line no-useless-computed-key
                        width: 'auto'
                    }}} label="To do" value="2" />
                <Tab onClick={()=>handleSelectAll(false)} sx={{width:'4rem', textTransform:'capitalize', ['@media (max-width:900px)']: { // eslint-disable-line no-useless-computed-key
                        width: 'auto'
                    }}} label="Completed" value="3" />
                
              </TabList>
            
            <TabPanel sx={{padding:'1rem 0'}} value="1">
              <div className="controls">
                <FormCheck className='select-all' checked={selectAll} onChange={(e)=>handleSelectAll(e.target.checked)} label='Select All' />
                <div className="controls-edit-buttons">
                  <Button onClick={()=>setEditMode(!editMode)} size='small' color='inherit' variant="outlined" startIcon={<FaRegEdit />}>{editMode?'Disable':'Edit'}</Button>
                  
                </div>
              </div>
              <ListGroup className='task-list'>
                {list.tasks && list.tasks.filter(item=>item.important).map(task=>(
                    <Task changedImportance={ ((changesArray.filter((v) => (v === task._id)).length)%2)===1} clickfunction={()=>markImportanceHandler(task._id)} updatingImportance={task._id===markingId} editMode={editMode} selectAll={selectAll} setSelectAll={setSelectAll} task={task} key={task._id} />
                ))}
              </ListGroup>
            </TabPanel>

            <TabPanel sx={{padding:'1rem 0'}} value="2">
              <div className="controls">
                <FormCheck className='select-all' checked={selectAll} onChange={(e)=>handleSelectAll(e.target.checked)} label='Select All' />
                <div className="controls-edit-buttons">
                  <Button onClick={()=>setEditMode(!editMode)} size='small' color='inherit' variant="outlined" startIcon={<FaRegEdit />}>{editMode?'Disable':'Edit'}</Button>
                  
                </div>
              </div>
              <ListGroup className='task-list'>
                {list.tasks && list.tasks.filter(item=>!item.completed).map(task=>(
                    <Task changedImportance={ ((changesArray.filter((v) => (v === task._id)).length)%2)===1} clickfunction={()=>markImportanceHandler(task._id)} updatingImportance={task._id===markingId} editMode={editMode} selectAll={selectAll} setSelectAll={setSelectAll} task={task} key={task._id} />
                ))}
              </ListGroup>
            </TabPanel>

            <TabPanel  sx={{padding:'1rem 0'}} value="3">
              <div className="controls">
                <FormCheck className='select-all' checked={selectAll} onChange={(e)=>handleSelectAll(e.target.checked)} label='Select All' />
                <div className="controls-edit-buttons">
                  <Button onClick={()=>setEditMode(!editMode)} size='small' color='inherit' variant="outlined" startIcon={<FaRegEdit />}>{editMode?'Disable':'Edit'}</Button>
                  
                  
                </div>
              </div>
              <ListGroup className='task-list'>
                {list.tasks && list.tasks.filter(item=>item.completed).map(task=>(
                    <Task clickfunction={()=>markImportanceHandler(task._id)} changedImportance={ ((changesArray.filter((v) => (v === task._id)).length)%2)===1} updatingImportance={task._id===markingId} completed editMode={editMode} selectAll={selectAll} setSelectAll={setSelectAll} task={task} key={task._id} />
                ))}
              </ListGroup>
            </TabPanel>

            

            
            
          </TabContext>
        </>      
      
      


    </Container>
  )
}

export default ListScreen