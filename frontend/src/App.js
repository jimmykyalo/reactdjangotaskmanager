import { HashRouter as Router, Route } from 'react-router-dom'
import SideBar from './components/SideBar';
import TasksScreen from './screens/TasksScreen';
import { Container } from 'react-bootstrap'
import Header from './components/Header';
import { useState } from 'react';
import ListScreen from './screens/ListScreen';
import { useSelector } from 'react-redux';
import HomeScreen from './screens/HomeScreen';


function App() {
  const userLogin = useSelector(state=>state.userLogin)
  const {userInfo} = userLogin
  const [isOpen, setIsOpen] = useState(true)
  return (
    <Router>
      <Container fluid className="main p-0 d-flex flex-row">
        {userInfo && <SideBar isOpen={isOpen} />}
        {userInfo && <SideBar fixed isOpen={isOpen} />}

        <Container fluid className='p-0 content'>
          <Header isOpen={isOpen} setIsOpen={setIsOpen} />
          <Route path={'/'} exact component={HomeScreen} />
          <Route path={'/tasks'} exact component={TasksScreen} />
          <Route path='/list/:id/' component={ListScreen} exact />
          <Route path={'/tasks/important'} >
            <TasksScreen important />
          </Route>
        </Container>
      </Container>
    </Router>
  );
}

export default App;
