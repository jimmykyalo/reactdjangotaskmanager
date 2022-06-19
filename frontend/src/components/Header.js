import { FormControl, IconButton, Input, InputAdornment, InputLabel } from '@mui/material';
import React, {useState, useEffect} from 'react'
import { Button, Container, Form, Modal, Navbar } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { login, logout } from '../actions/userActions';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import Loader from './Loader';
import Message from './Message';
import { GiHamburgerMenu } from 'react-icons/gi'

function Header({setIsOpen, isOpen, fixed}) {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const userLogin = useSelector(state=>state.userLogin)
  const {error, loading, userInfo } = userLogin
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    if(userInfo){
      setShowModal(false)
    }else{
      setShowModal(true)
    }
  
    
  }, [userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  const validateEmail = () => {
    var re = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    
    
    setEmailError(!re.test(email))
  }

  const handleEmailChange = e => {
      setEmail( e.target.value)
      
      validateEmail()

  };
  const handleClickShowPassword = () => {
      
        setShowPassword(!showPassword)
      
  };

  const handleMouseDownPassword = (event) => {
      event.preventDefault();
  };
  
  return (
    <Navbar fixed='top' className={`py-3 ${!isOpen && 'closed'}`}>
        <Container fluid>
            <Navbar.Brand className='text-dark'>
            <div className="sidebar-toggle">
              <GiHamburgerMenu onClick={()=>setIsOpen(!isOpen)} className='sidebar-toggle-icon'/>
            </div>
            </Navbar.Brand>
            {userInfo?<Button variant="primary" onClick={()=>dispatch(logout())}>
              Logout
            </Button>:<Button variant="primary" onClick={handleShowModal}>
              Login
            </Button>}
        </Container>
        <Modal centered show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitHandler}>
                <FormControl  size="large" variant="standard" fullWidth>
                    <InputLabel color="primary" sx={{fontSize:20}} htmlFor="email">
                        Email Address
                    </InputLabel>
                    <Input
                        required
                        placeholder="Enter Email Address"
                        id="email"
                        type="email"
                        startAdornment={
                            <InputAdornment position="start">
                                <EmailOutlinedIcon />
                            </InputAdornment>
                        }
                        value={email}
                        onChange={handleEmailChange}
                        error ={emailError}
                        color="success"
                    />
                    
                </FormControl>


                <FormControl sx={{my:4}} size="large" variant="standard" fullWidth>
                    <InputLabel color="primary" sx={{fontSize:20}} htmlFor="password">
                        Password
                    </InputLabel>
                    <Input
                        required
                        placeholder="Enter Password"
                        sx={{mt:0}}
                        color="success"
                        startAdornment={
                            <InputAdornment position="start">
                                <LockOutlinedIcon />
                            </InputAdornment>
                        }
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        }
                    />
                    
                </FormControl>



                {loading && <Loader />}
                <button color="success" type='submit' className='w-100 mb-2  btn btn-primary' >
                    Sign In <LoginRoundedIcon />
                </button>
                {error && <Message severity={'error'}>{error}</Message>}

                </Form>
                </Modal.Body>
        
      </Modal>
    </Navbar>
    
  )
}

export default Header