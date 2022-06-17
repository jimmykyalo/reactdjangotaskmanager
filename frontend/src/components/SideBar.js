import React, {useState} from 'react'
import { Nav } from 'react-bootstrap'
import { GiHamburgerMenu } from 'react-icons/gi'
import { RiTodoLine } from 'react-icons/ri'
import { NavLink } from 'react-router-dom'
import { FaHome, FaListAlt, FaStar, FaAngleRight } from 'react-icons/fa';

function SideBar() {
  const [isOpen, setIsOpen] = useState(true)
  return (
    <div className={`sidebar ${!isOpen && 'closed'}`}>
       <div className="sidebar-header">
          <div className="sidebar-header-heading">
            <RiTodoLine className="sidebar-header-heading-icon"/>
            <span className="sidebar-header-heading-text">Task App</span>
          </div>
          <div className="sidebar-header-toggle">
            <GiHamburgerMenu onClick={()=>setIsOpen(!isOpen)} className='sidebar-header-toggle-icon'/>
          </div>
       </div>
       <NavLink activeClassName='selected' className='sidebar-link' to='/home'>
          <FaHome className='sidebar-link-icon' />
          <span className='sidebar-link-text'>Home</span>
          <FaAngleRight className='sidebar-link-icon-expand' />
       </NavLink>

       <NavLink activeClassName='selected' className='sidebar-link' to='/home'>
          <FaListAlt className='sidebar-link-icon' />
          <span className='sidebar-link-text'>Tasks</span>
          <FaAngleRight className='sidebar-link-icon-expand' />
       </NavLink>

       <NavLink activeClassName='selected' className='sidebar-link' to='/home'>
          <FaStar className='sidebar-link-icon' />
          <span className='sidebar-link-text'>Important</span>
          <FaAngleRight className='sidebar-link-icon-expand' />
       </NavLink>
    </div>
  )
}

export default SideBar