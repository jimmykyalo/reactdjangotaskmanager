import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaListAlt, FaStar } from 'react-icons/fa';
import { Avatar, TextField } from '@mui/material'
import { HiChevronRight } from 'react-icons/hi';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
function SideBar({isOpen, fixed}) {
  
  return (
    <div className={`sidebar  ${!isOpen && 'closed'} ${fixed && 'fixed'}`}>
        
       <div className="sidebar-header">
          <div className="sidebar-header-heading">
            <Avatar sx={{backgroundColor:'#5946D2'}} className="sidebar-header-heading-icon">JK</Avatar>
            <div className="sidebar-header-heading-text">
                <span className="sidebar-header-heading-text-name">Jimmy Kyalo</span>
                <span className="sidebar-header-heading-text-email">jimm.kyalo@gmail.com</span>
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

       <NavLink exact activeClassName='selected' className='sidebar-link' to='/'>
          <FaListAlt style={{fill:'#5187ed'}} className='sidebar-link-icon' />
          <span className='sidebar-link-text'>Tasks</span>
          <HiChevronRight className='sidebar-link-icon-expand' />
       </NavLink>

       <NavLink activeClassName='selected' className='sidebar-link' to='/lists'>
          <FaStar style={{fill:'#F85977'}} className='sidebar-link-icon' />
          <span className='sidebar-link-text'>Important</span>
          <HiChevronRight className='sidebar-link-icon-expand' />
       </NavLink>

       <div className="divider"></div>
    </div>
  )
}

export default SideBar