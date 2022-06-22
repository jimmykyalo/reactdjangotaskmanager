import { FormControl, IconButton, Input, InputAdornment, InputLabel } from '@mui/material';
import React, {useState, useEffect} from 'react'
import { Form, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../actions/userActions';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import Loader from './Loader';
import Message from './Message';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';

function RegisterForm({showRegisterModal, setShowRegisterModal}) {
    const handleCloseModal = () => setShowRegisterModal(false);
    const userLogin = useSelector(state=>state.userLogin)
    const {error, loading, userInfo } = userLogin
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState()
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    useEffect(() => {
        if(userInfo){
        setShowRegisterModal(false)
    }
        
        
    
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userInfo])

    const submitHandler = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(register({firstName, lastName, email, password}))
        }

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

    const handleClickShowConfirmPassword = () => {
        
        setShowConfirmPassword(!showPassword)
    
    };

    const handleMouseDownConfirmPassword = (event) => {
        event.preventDefault();
    };

  return (
    
        
        <Modal backdropClassName='login' className='login' centered show={showRegisterModal} onHide={handleCloseModal}>
        
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {message && <Message variant='error'>{message}</Message>}
          <Form onSubmit={submitHandler}>
                <FormControl  size="large" fullWidth variant="standard" >
                    <InputLabel color="primary" sx={{fontSize:20}} htmlFor="firstName">
                        First Name
                    </InputLabel>
                    <Input
                        
                        placeholder="First Name"
                        id="firstName"
                        type="text"
                        startAdornment={
                            <InputAdornment position="start">
                                <PersonOutlinedIcon />
                            </InputAdornment>
                        }
                        value={firstName}
                        onChange={(e)=>setFirstName(e.target.value)}
                        
                        color="primary"
                    />
                </FormControl>

                <FormControl sx={{my:4}}  size="large" fullWidth variant="standard" >
                <InputLabel color="primary" sx={{fontSize:20}} htmlFor="lastName">
                        Last Name
                    </InputLabel>
                    <Input
                        
                        placeholder="Last Name"
                        id="lastName"
                        type="text"
                        startAdornment={
                            <InputAdornment position="start">
                                <PersonOutlinedIcon />
                            </InputAdornment>
                        }
                        value={lastName}
                        onChange={(e)=>setLastName(e.target.value)}
                        
                        color="primary"
                    />
                </FormControl>
                
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
                        color="primary"
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

                <FormControl sx={{mb:4}} size="large" variant="standard" fullWidth>
                    <InputLabel color="primary" sx={{fontSize:20}} htmlFor="confirmPassword">
                        Confirm Password
                    </InputLabel>
                    <Input
                        error ={confirmPassword!=='' && password!==confirmPassword}
                        required
                        placeholder="Confirm Password"
                        sx={{mt:0}}
                        color={confirmPassword===password?"success":"primary"}
                        startAdornment={
                            <InputAdornment position="start">
                                <LockOutlinedIcon />
                            </InputAdornment>
                        }
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle confirmPassword visibility"
                                onClick={handleClickShowConfirmPassword}
                                onMouseDown={handleMouseDownConfirmPassword}
                                edge="end"
                            >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        }
                    />
                    
                </FormControl>



                
                 <button color="success" type='submit' className='w-100 mb-2  btn btn-primary' >
                 {loading ? <Loader modal />: <>Sign In <LoginRoundedIcon /></>}
                </button>
                {error && <Message severity={'error'}>{error}</Message>}

                </Form>
                </Modal.Body>
        
      </Modal>
   
  )
}

export default RegisterForm