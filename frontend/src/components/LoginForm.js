import { FormControl, IconButton, Input, InputAdornment, InputLabel } from '@mui/material';
import React, {useState, useEffect} from 'react'
import { Form, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../actions/userActions';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import Loader from './Loader';
import Message from './Message';

function LoginForm({showModal, setShowModal}) {
    const handleCloseModal = () => setShowModal(false);
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
    }
        
        
    
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    
        
        <Modal backdropClassName='login' className='login' centered show={showModal} onHide={handleCloseModal}>
        
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



                
                 <button color="success" type='submit' className='w-100 mb-2  btn btn-primary' >
                 {loading ? <Loader modal />: <>Sign In <LoginRoundedIcon /></>}
                </button>
                {error && <Message severity={'error'}>{error}</Message>}

                </Form>
                </Modal.Body>
        
      </Modal>
   
  )
}

export default LoginForm