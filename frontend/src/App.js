import { HashRouter as Router, Route } from 'react-router-dom'
import SideBar from './components/SideBar';
import HomeScreen from './screens/HomeScreen';
import { Container } from 'react-bootstrap'
import Header from './components/Header';
import { useState } from 'react';

function App() {
  const [isOpen, setIsOpen] = useState(true)
  return (
    <Router>
      <Container fluid className="main p-0 d-flex flex-row">
        <SideBar isOpen={isOpen} />
        <SideBar fixed isOpen={isOpen} />

        <Container fluid className='p-0 content'>
          <Header isOpen={isOpen} setIsOpen={setIsOpen} />
          
          <Route path={'/'} exact component={HomeScreen} />
          <Route path={'/important'} >
            <HomeScreen important />
          </Route>
        </Container>
      </Container>
    </Router>
  );
}

export default App;
