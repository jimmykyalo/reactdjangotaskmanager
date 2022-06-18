import React, {useState} from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { NavLink } from 'react-router-dom'
import { FaHome, FaListAlt, FaStar } from 'react-icons/fa';
import { Avatar, TextField } from '@mui/material'
import { HiChevronRight } from 'react-icons/hi';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
function SideBar() {
  const [isOpen, setIsOpen] = useState(true)
  return (
    <div className={`sidebar  ${!isOpen && 'closed'}`}>
        <div className="sidebar-toggle">
            <GiHamburgerMenu onClick={()=>setIsOpen(!isOpen)} className='sidebar-toggle-icon'/>
        </div>
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
       
       <NavLink activeClassName='selected' className='sidebar-link' to='/home'>
          <FaHome className='sidebar-link-icon' />
          <span className='sidebar-link-text'>Home</span>
          <HiChevronRight className='sidebar-link-icon-expand' />
       </NavLink>

       <NavLink activeClassName='selected' className='sidebar-link' to='/tasks'>
          <FaListAlt className='sidebar-link-icon' />
          <span className='sidebar-link-text'>Tasks</span>
          <HiChevronRight className='sidebar-link-icon-expand' />
       </NavLink>

       <NavLink activeClassName='selected' className='sidebar-link' to='/lists'>
          <FaStar className='sidebar-link-icon' />
          <span className='sidebar-link-text'>Important</span>
          <HiChevronRight className='sidebar-link-icon-expand' />
       </NavLink>
    </div>
  )
}

export default SideBar