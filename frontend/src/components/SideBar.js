import React, {useState, useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import { FaListAlt, FaPlus, FaStar } from 'react-icons/fa';
import { Avatar, TextField } from '@mui/material'
import { HiChevronRight } from 'react-icons/hi';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { useSelector, useDispatch } from 'react-redux'
import { LIST_CREATE_RESET, LIST_DELETE_RESET, LIST_UPDATE_RESET } from '../constants/listConstants'
import {listLists } from '../actions/listActions'
import Loader from './Loader';
import Message from './Message';
import { BsCardChecklist } from 'react-icons/bs';
import AddListForm from './AddListForm';
import AddTaskForm from './AddTaskForm';

function SideBar({isOpen, fixed}) {
  const [addTaskModal, setAddTaskModal] = useState(false)
  const [listModal, setListModal] = useState(false)
  const dispatch = useDispatch()
  const userLogin = useSelector(state=>state.userLogin)
  const {userInfo } = userLogin
  
  const listList = useSelector(state=>state.listList)
  const {loading, error, lists } = listList

  const listCreate = useSelector(state=>state.listCreate)
  const {success:successCreate} = listCreate

  const listUpdate = useSelector(state=>state.listUpdate)
  const {success:successUpdate, loading:loadingUpdate, error: errorUpdate} = listUpdate

  const listDelete = useSelector(state=>state.listDelete)
  const {success:successDelete, loading:loadingDelete, error: errorDelete} = listDelete

  

  useEffect(() => {
    
    userInfo && dispatch(listLists())

    if (successCreate){
      dispatch({type:LIST_CREATE_RESET})
    }
    if (successUpdate){
      
      dispatch({type:LIST_UPDATE_RESET})
    }

    if (successDelete){
      dispatch({type:LIST_DELETE_RESET})
    }

    
    
  }, [dispatch, userInfo, successCreate, successUpdate, successDelete])
  
  return (
    <div className={`sidebar  ${!isOpen && 'closed'} ${fixed && 'fixed'}`}>
        
       <div className="sidebar-header">
          <div className="sidebar-header-heading">
            <Avatar sx={{backgroundColor:'#5946D2'}} className="sidebar-header-heading-icon">{userInfo.initials}</Avatar>
            <div className="sidebar-header-heading-text">
                <span className="sidebar-header-heading-text-name">{userInfo.name}</span>
                <span className="sidebar-header-heading-text-email">{userInfo.username}</span>
            </div>
          </div>
          
       </div>

       

       <div className='sidebar-search'>
            <TextField InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color='primary' />
            </InputAdornment>
          ),
        }} placeholder="Search" hiddenLabel variant='filled' color='primary' type="search" />
       </div>
       
       {/* <NavLink activeClassName='selected' className='sidebar-link' to='/home'>
          <FaHome className='sidebar-link-icon' />
          <span className='sidebar-link-text'>Home</span>
          <HiChevronRight className='sidebar-link-icon-expand' />
       </NavLink> */}

      <div className="py-2 d-flex align-items-center sidebar-list-title">
        <span className="sidebar-list-title-text">Tasks:</span>
        <div className="sidebar-list-title-buttons">
          <FaPlus onClick={()=>setAddTaskModal(true)} className='sidebar-list-title-buttons-icon' />
        </div>
      </div>

       <NavLink exact activeClassName='selected' className='sidebar-link' to='/tasks'>
          <FaListAlt style={{fill:'#5187ed'}} className='sidebar-link-icon' />
          <span className='sidebar-link-text'>Tasks</span>
          <HiChevronRight className='sidebar-link-icon-expand' />
       </NavLink>

       <NavLink activeClassName='selected' className='sidebar-link' to='/tasks/important'>
          <FaStar style={{fill:'#F85977'}} className='sidebar-link-icon' />
          <span className='sidebar-link-text'>Important</span>
          <HiChevronRight className='sidebar-link-icon-expand' />
       </NavLink>

       <div className="divider"></div>
       <div className="py-2 d-flex align-items-center sidebar-list-title">
        <span className="sidebar-list-title-text">Lists:</span>
        <div className="sidebar-list-title-buttons">
          <FaPlus onClick={()=>setListModal(true)} className='sidebar-list-title-buttons-icon' />
        </div>
       </div>
       <AddListForm listShow={listModal} setListShow={setListModal} />
       <AddTaskForm taskShow={addTaskModal} setTaskShow={setAddTaskModal} />
       {loading || loadingDelete || loadingUpdate ? <Loader />:error || errorDelete || errorUpdate? <Message severity='error'>{error || errorDelete || errorUpdate}</Message>:
            lists.map(list=>(
              <NavLink key={list._id} activeClassName='selected' className='sidebar-link' to={`/list/${list._id}/`}>
                <BsCardChecklist style={{fill:'#5946D2'}} className='sidebar-link-icon' />
                <span className='sidebar-link-text'>{list.name}</span>
                <HiChevronRight className='sidebar-link-icon-expand' />
              </NavLink>
            ))
       }
    </div>
  )
}

export default SideBar