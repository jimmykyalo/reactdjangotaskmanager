import React, {useState, useEffect} from 'react'
import { Button, Container, Navbar } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../actions/userActions';
import { GiHamburgerMenu } from 'react-icons/gi'
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

function Header({setIsOpen, isOpen, fixed}) {
  const [showModal, setShowModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [userClass, setUserClass] = useState('')
  const userLogin = useSelector(state=>state.userLogin)
  const {userInfo } = userLogin
  

  const dispatch = useDispatch()

  useEffect(() => {
    if(userInfo){
      setShowModal(false)
      setUserClass('')
    }else{
      setUserClass('index')
      
    }
  
    
  }, [userInfo])

  

  


  
  return (
    <Navbar fixed='top' className={`py-3 ${!isOpen && 'closed'} ${userClass}`}>
        <Container fluid>
            <Navbar.Brand className='text-dark'>
            {userInfo && <div className="sidebar-toggle">
              <GiHamburgerMenu onClick={()=>setIsOpen(!isOpen)} className='sidebar-toggle-icon'/>
            </div>}
            </Navbar.Brand>
            {userInfo?<Button variant="primary" onClick={()=>dispatch(logout())}>
              Logout
            </Button>:<div className='d-flex'><Button variant="info" onClick={()=>setShowModal(true)}>
              Login
            </Button> <Button variant="primary" onClick={()=>setShowRegisterModal(true)}>
              Sign Up
            </Button></div>}
        </Container>
        <LoginForm showModal={showModal} setShowModal={setShowModal} />
        <RegisterForm showRegisterModal={showRegisterModal} setShowRegisterModal={setShowRegisterModal} />
    </Navbar>
    
  )
}

export default Header